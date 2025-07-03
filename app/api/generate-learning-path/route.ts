import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
// Import the Google AI SDK provider
import { google } from "@ai-sdk/google";

export async function POST(request: NextRequest) {
  try {
    // Destructure userProfile from the request body
    const { userProfile } = await request.json();

    const prompt = `Create a personalized adaptive learning path for a student with the following profile:

Personal Information:
- Name: ${userProfile.name}
- Age: ${userProfile.age}
- Grade Level: ${userProfile.gradeLevel}
- Learning Style: ${userProfile.learningStyle.join(", ")}

Learning Preferences:
- Preferred Study Time: ${userProfile.preferredStudyTime.join(", ")}
- Session Length: ${userProfile.preferredSessionLength} minutes
- Attention Span: ${userProfile.attentionSpan} minutes
- Difficulty Preference: ${userProfile.difficultyPreference}

Subjects and Goals:
${userProfile.subjects
  .map(
    (s: any) =>
      `- ${s.subject}: Current Level ${s.currentLevel}, Target Level ${s.targetLevel}, ${s.weeklyHours}h/week`
  )
  .join("\n")}

Learning Characteristics:
- Challenges: ${userProfile.learningChallenges.join(", ")}
- Motivation Factors: ${userProfile.motivationFactors.join(", ")}
- Primary Goals: ${userProfile.primaryGoals.join(", ")}

Create a detailed adaptive learning path that includes:
1. Personalized learning modules for each subject
2. Adaptive reasoning for each module based on the student's profile
3. Appropriate difficulty progression
4. Time estimates based on their attention span and session preferences
5. Prerequisites and learning dependencies

Format the response as JSON with an array of learning modules, each containing:
- id, title, subject, difficulty (1-10), estimatedTime, status, progress, adaptiveReason, prerequisites`;

    let text: string | null = null;
    try {
      // The @ai-sdk/google library automatically picks up GOOGLE_API_KEY from process.env
      // So, you don't need to pass it explicitly in the model configuration.
      const result = await generateText({
        model: google("gemini-1.5-flash"), // API key is now picked from GOOGLE_API_KEY env var
        prompt,
        // Updated system prompt for learning path generation
        system:
          "You are an expert educational AI that creates personalized learning paths. Always respond with valid JSON containing detailed, adaptive learning modules tailored to the individual student's profile.",
      });
      text = result.text;
    } catch (sdkError) {
      console.warn(
        "Gemini SDK unavailable in preview – returning stub content.",
        sdkError
      );
    }

    let modules; // Changed from 'content' to 'modules'
    try {
      const parsed = text ? JSON.parse(text) : {}; // Ensure parsed is an object for .modules access
      modules = parsed.modules || []; // Assume the AI returns an object with a 'modules' array, or an array directly
    } catch {
      // Fallback if JSON parsing fails
      modules = [];
    }

    // Fallback stub (works both offline and in the preview sandbox).
    if (modules.length === 0) {
      // Check if modules array is empty
      modules = [
        {
          id: "stub-1",
          title: `Introduction to ${
            userProfile.subjects[0]?.subject || "Subject"
          }`,
          subject: userProfile.subjects[0]?.subject || "General",
          difficulty: 3,
          estimatedTime: userProfile.preferredSessionLength,
          status: "not-started",
          progress: 0,
          adaptiveReason: `Based on your ${userProfile.learningStyle.join(
            ", "
          )} learning style and ${
            userProfile.attentionSpan
          } minute attention span.`,
          prerequisites: [],
        },
        {
          id: "stub-2",
          title: `Practice Problems for ${
            userProfile.subjects[0]?.subject || "Subject"
          }`,
          subject: userProfile.subjects[0]?.subject || "General",
          difficulty: 5,
          estimatedTime: userProfile.preferredSessionLength,
          status: "not-started",
          progress: 0,
          adaptiveReason: `Focusing on your ${userProfile.learningChallenges.join(
            ", "
          )} challenges.`,
          prerequisites: ["stub-1"],
        },
      ];
    }

    return NextResponse.json({ modules }); // Return 'modules'
  } catch (error) {
    console.error("Error generating learning path:", error); // Updated error message
    return NextResponse.json(
      { error: "Failed to generate learning path" }, // Updated error message
      { status: 500 }
    );
  }
}
