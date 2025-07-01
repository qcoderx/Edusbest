import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userProfile, subject, topic, difficulty, questionCount } = await request.json()

    const subjectInfo = userProfile.subjects.find((s: any) => s.subject === subject)

    const prompt = `Generate a personalized quiz for a student with the following profile:

Student Profile:
- Learning Style: ${userProfile.learningStyle.join(", ")}
- Subject: ${subject}
- Current Level: ${subjectInfo?.currentLevel || 5}/10
- Topic: ${topic || "General concepts"}
- Difficulty: ${difficulty || "Medium"}
- Learning Challenges: ${userProfile.learningChallenges.join(", ")}

Quiz Requirements:
- Number of Questions: ${questionCount || 5}
- Difficulty Level: ${difficulty || "Medium"}
- Question Types: Mix of multiple choice, short answer, and problem-solving
- Adapt questions to their learning style and current level
- Include clear explanations for each answer

Create a quiz that tests understanding while being appropriate for their skill level.
Consider their learning challenges: ${userProfile.learningChallenges.join(", ")}

Format as JSON with:
{
  "title": "Quiz Title",
  "instructions": "Quiz instructions",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice|short_answer|problem_solving",
      "question": "Question text",
      "options": ["A", "B", "C", "D"] (for multiple choice),
      "correct_answer": "Correct answer",
      "explanation": "Why this is correct",
      "difficulty": "Easy|Medium|Hard",
      "learning_objective": "What this tests"
    }
  ]
}`

    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: process.env.API_KEY,
      }),
      prompt,
      system:
        "You are an expert educational assessment creator. Generate fair, engaging quizzes that accurately assess student understanding while being appropriate for their learning level. Always respond with valid JSON.",
    })

    let quiz
    try {
      quiz = JSON.parse(text)
    } catch {
      // Fallback quiz
      quiz = {
        title: `${subject} Quiz - ${topic || "General"}`,
        instructions:
          "Answer all questions to the best of your ability. Take your time and think through each question carefully.",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question: "Sample question adapted to your level",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct_answer: "Option A",
            explanation: "This is the correct answer because...",
            difficulty: difficulty || "Medium",
            learning_objective: "Test basic understanding",
          },
        ],
      }
    }

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error("Error generating quiz:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}
