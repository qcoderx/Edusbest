import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userProfile, question, context } = await request.json()

    const prompt = `You are an AI tutor helping a student with the following profile:

Student Profile:
- Name: ${userProfile.name}
- Learning Style: ${userProfile.learningStyle.join(", ")}
- Current Subjects: ${userProfile.subjects.map((s: any) => `${s.subject} (Level ${s.currentLevel})`).join(", ")}
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

Keep the response engaging and appropriate for their learning level.`

    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: process.env.API_KEY,
      }),
      prompt,
      system:
        "You are a patient, encouraging AI tutor who adapts teaching methods to each student's unique learning profile. Provide clear, helpful explanations that build confidence and understanding.",
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in AI tutor:", error)
    return NextResponse.json({ error: "Failed to get tutor response" }, { status: 500 })
  }
}
