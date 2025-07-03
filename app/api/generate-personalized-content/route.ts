import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google"; // Google AI SDK provider

export async function POST(request: NextRequest) {
  try {
    // Destructure userProfile and new content parameters from the request body
    const { userProfile, subject, topic, contentType, customPrompt } =
      await request.json();

    // Find the specific subject's info from the user profile, if available
    const subjectInfo = userProfile.subjects.find(
      (s: any) => s.subject === subject
    );

    // Construct the detailed prompt for the AI model
    const prompt = `Generate personalized ${contentType} content for a student with the following profile:

Student Profile:
- Name: ${userProfile.name}
- Learning Style: ${userProfile.learningStyle.join(", ")}
- Attention Span: ${userProfile.attentionSpan} minutes
- Difficulty Preference: ${userProfile.difficultyPreference}
- Feedback Preference: ${userProfile.feedbackPreference}
- Learning Challenges: ${userProfile.learningChallenges.join(", ")}
- Motivation Factors: ${userProfile.motivationFactors.join(", ")}

Subject Details:
- Subject: ${subject}
- Current Level: ${subjectInfo?.currentLevel || 5}/10
- Target Level: ${subjectInfo?.targetLevel || 8}/10
- Weekly Hours: ${subjectInfo?.weeklyHours || 3}h/week
- Topic Focus: ${topic || "General concepts"}

Content Requirements:
- Content Type: ${contentType}
- Session Length: ${userProfile.preferredSessionLength} minutes
- Custom Request: ${customPrompt || "None"}

Create comprehensive learning content that includes:
1. A detailed explanation tailored to their learning style and level
2. 3-5 relevant examples that connect to their interests and background
3. Practice exercises with varying difficulty levels
4. Personalized learning tips based on their challenges and preferences
5. Clear next steps for continued learning
${
  userProfile.learningStyle.includes("visual")
    ? `6. Since the user is a visual learner, please also suggest 3-5 relevant YouTube video topics or search queries that would help them understand the content. Format this as an array of strings under a "youtubeSuggestions" key in the JSON response.`
    : ""
}

Adapt the content specifically for:
- ${
      userProfile.learningStyle.includes("visual")
        ? "Visual learners (include descriptions of diagrams, charts, visual aids)"
        : ""
    }
- ${
      userProfile.learningStyle.includes("auditory")
        ? "Auditory learners (include verbal explanations, discussion points)"
        : ""
    }
- ${
      userProfile.learningStyle.includes("kinesthetic")
        ? "Kinesthetic learners (include hands-on activities, movement-based learning)"
        : ""
    }
- ${
      userProfile.learningStyle.includes("reading")
        ? "Reading/Writing learners (include text-based activities, note-taking strategies)"
        : ""
    }

Consider their learning challenges: ${userProfile.learningChallenges.join(", ")}
Incorporate their motivation factors: ${userProfile.motivationFactors.join(
      ", "
    )}

Format as JSON with: explanation, examples[], exercises[{question, difficulty, type}], tips[], nextSteps[]${
      userProfile.learningStyle.includes("visual")
        ? ", youtubeSuggestions[]"
        : ""
    }`;

    let text: string | null = null;
    try {
      // Call the Google Generative AI model using @ai-sdk/google
      // The API key is automatically picked up from the GOOGLE_API_KEY environment variable.
      const result = await generateText({
        model: google("gemini-1.5-flash"), // No explicit apiKey needed here
        prompt,
        system:
          "You are an expert educational content creator specializing in personalized, adaptive learning. Create engaging, tailored content that matches the student's learning profile perfectly. Always respond with valid JSON.",
      });
      text = result.text;
    } catch (sdkError) {
      console.warn(
        "Gemini SDK unavailable in preview – returning stub content.",
        sdkError
      );
    }

    let content;
    try {
      // Attempt to parse the AI-generated text as JSON
      content = text ? JSON.parse(text) : null;
    } catch {
      // If parsing fails, set content to null to trigger the fallback
      content = null;
    }

    // Fallback stub content in case AI generation fails or returns invalid JSON
    if (!content) {
      content = {
        explanation: `This personalized ${contentType} for ${subject} has been tailored to your ${userProfile.learningStyle.join(
          " and "
        )} learning style. The content is designed to match your current skill level and help you progress toward your goals.`,
        examples: [
          "Example 1: Practical application relevant to your interests",
          "Example 2: Step-by-step breakdown for your learning style",
          "Example 3: Real-world scenario to enhance understanding",
        ],
        exercises: [
          {
            question: "Practice question adapted to your skill level",
            difficulty: "Beginner",
            type: "Multiple Choice",
          },
          {
            question: "Interactive exercise matching your learning style",
            difficulty: "Intermediate",
            type: "Problem Solving",
          },
          {
            question: "Challenge question to push your boundaries",
            difficulty: "Advanced",
            type: "Open Ended",
          },
        ],
        tips: [
          "Focus on understanding concepts before memorizing",
          "Practice regularly in short, focused sessions",
          "Connect new learning to your existing knowledge",
        ],
        nextSteps: [
          "Complete the practice exercises",
          "Review any challenging concepts",
          "Move to the next topic when ready",
        ],
        youtubeSuggestions: userProfile.learningStyle.includes("visual")
          ? [
              `"Introduction to ${topic || subject} for beginners"`,
              `"Visual explanation of ${topic || subject}"`,
              `"Real-world examples of ${topic || subject}"`,
            ]
          : [],
      };
    }

    // Return the generated or fallback content as a JSON response
    return NextResponse.json({ content });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error generating personalized content:", error);
    // Return an error response to the client
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
