import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Destructure userProfile, subject, topic, difficulty, and questionCount from the request body
    const { userProfile, subject, topic, difficulty, questionCount } =
      await request.json();

    // Find the specific subject's info from the user profile, if available
    const subjectInfo = userProfile.subjects.find(
      (s: any) => s.subject === subject
    );

    // Construct the detailed prompt for the AI quiz generation model
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
}`;

    let text: string | null = null;
    try {
      // Call the Google Generative AI model using @ai-sdk/google
      // The API key is automatically picked up from the GOOGLE_API_KEY environment variable.
      const result = await generateText({
        model: google("gemini-1.5-flash"), // API key is now picked from GOOGLE_API_KEY env var
        prompt,
        system:
          "You are an expert educational assessment creator. Generate fair, engaging quizzes that accurately assess student understanding while being appropriate for their learning level. Always respond with valid JSON.",
      });
      text = result.text;
    } catch (sdkError) {
      console.warn(
        "Gemini SDK unavailable in preview – returning stub content.",
        sdkError
      );
      // Fallback text in case of an SDK error or preview environment
      text = JSON.stringify({
        title: `${subject} Quiz - ${topic || "General"} (Fallback)`,
        instructions:
          "Answer all questions to the best of your ability. Take your time and think through each question carefully. (Fallback)",
        questions: [
          {
            id: 1,
            type: "multiple_choice",
            question: "Sample question adapted to your level (Fallback)",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct_answer: "Option A",
            explanation: "This is the correct answer because... (Fallback)",
            difficulty: difficulty || "Medium",
            learning_objective: "Test basic understanding (Fallback)",
          },
          {
            id: 2,
            type: "short_answer",
            question: "Another sample question for you (Fallback)",
            correct_answer: "Sample Answer",
            explanation: "This answer explains... (Fallback)",
            difficulty: difficulty || "Medium",
            learning_objective: "Test deeper understanding (Fallback)",
          },
        ],
      });
    }

    let quiz;
    try {
      // Attempt to parse the AI-generated text as JSON
      quiz = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "Failed to parse AI response as JSON, using fallback:",
        parseError
      );
      // Fallback quiz if JSON parsing fails
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
          {
            id: 2,
            type: "short_answer",
            question: "Another sample question for you",
            correct_answer: "Sample Answer",
            explanation: "This answer explains...",
            difficulty: difficulty || "Medium",
            learning_objective: "Test deeper understanding",
          },
        ],
      };
    }

    // Return the generated or fallback quiz as a JSON response
    return NextResponse.json({ quiz });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error generating quiz:", error);
    // Return an error response to the client
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
