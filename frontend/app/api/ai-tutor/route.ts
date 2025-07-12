import { generateText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google"; // Google AI SDK provider

export async function POST(request: NextRequest) {
  try {
    // Destructure userProfile, question, and context from the request body
    const { userProfile, question, context } = await request.json();

    // Construct the detailed prompt for the AI tutor model
    const prompt = `You are an AI tutor helping a student with the following profile:

Student Profile:
- Name: ${userProfile.name}
- Learning Style: ${userProfile.learningStyle.join(", ")}
- Current Subjects: ${userProfile.subjects
      .map((s: any) => `${s.subject} (Level ${s.currentLevel})`)
      .join(", ")}
- Learning Challenges: ${userProfile.learningChallenges.join(", ")}
- Motivation Factors: ${userProfile.motivationFactors.join(", ")}
- Preferred Session Length: ${userProfile.preferredSessionLength} minutes
- Attention Span: ${userProfile.attentionSpan} minutes

Student Question: "${question}"
Context: ${context || "General help request"}

Provide a helpful, personalized response that:
1. Addresses their specific question
2. Adapts to their learning style and level
3. Considers their learning challenges
4. Provides step-by-step guidance if needed
5. Suggests follow-up practice or resources
6. Encourages them based on their motivation factors

Keep the response engaging and appropriate for their learning level.`;

    let text: string | null = null;
    try {
      // Call the Google Generative AI model using @ai-sdk/google
      // The API key is automatically picked up from the GOOGLE_API_KEY environment variable.
      const result = await generateText({
        model: google("gemini-1.5-flash"), // No explicit apiKey needed here
        prompt,
        system:
          "You are a patient, encouraging AI tutor who adapts teaching methods to each student's unique learning profile. Provide clear, helpful explanations that build confidence and understanding.",
      });
      text = result.text;
    } catch (sdkError) {
      console.warn(
        "Gemini SDK unavailable in preview – returning stub content.",
        sdkError
      );
      // In a real application, you might provide a more robust fallback
      // or re-throw the error if AI response is critical.
      text =
        "I'm sorry, I couldn't process your request at the moment. Please try again later.";
    }

    // Return the AI tutor's response as a JSON response
    return NextResponse.json({ response: text });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error in AI tutor:", error);
    // Return an error response to the client
    return NextResponse.json(
      { error: "Failed to get tutor response" },
      { status: 500 }
    );
  }
}
