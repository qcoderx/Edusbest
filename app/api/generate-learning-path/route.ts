import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userProfile } = await request.json()

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
${userProfile.subjects.map((s) => `- ${s.subject}: Current Level ${s.currentLevel}, Target Level ${s.targetLevel}, ${s.weeklyHours}h/week`).join("\n")}

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
- id, title, subject, difficulty (1-10), estimatedTime, status, progress, adaptiveReason, prerequisites`

    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: process.env.API_KEY,
      }),
      prompt,
      system:
        "You are an expert educational AI that creates personalized learning paths. Always respond with valid JSON containing detailed, adaptive learning modules tailored to the individual student's profile.",
    })

    let modules
    try {
      const parsed = JSON.parse(text)
      modules = parsed.modules || parsed
    } catch {
      // Fallback if JSON parsing fails
      modules = []
    }

    return NextResponse.json({ modules })
  } catch (error) {
    console.error("Error generating learning path:", error)
    return NextResponse.json({ error: "Failed to generate learning path" }, { status: 500 })
  }
}
