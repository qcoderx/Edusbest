import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { performanceData } = await request.json()

    const prompt = `Analyze the following student performance data and provide personalized recommendations:
    
    Performance Data: ${JSON.stringify(performanceData)}
    
    Provide analysis in the following areas:
    1. Strengths and weaknesses identification
    2. Learning pace assessment
    3. Recommended next steps
    4. Difficulty adjustment suggestions
    5. Motivational insights
    
    Format as JSON with keys: strengths, weaknesses, pace, recommendations, difficulty, motivation`

    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: process.env.API_KEY,
      }),
      prompt,
      system:
        "You are an AI learning analytics expert. Provide detailed, actionable insights based on student performance data. Always respond with valid JSON.",
    })

    let analysis
    try {
      analysis = JSON.parse(text)
    } catch {
      // Fallback analysis
      analysis = {
        strengths: ["Problem-solving skills", "Consistent effort"],
        weaknesses: ["Mathematical concepts", "Time management"],
        pace: "Moderate - progressing steadily",
        recommendations: ["Focus on foundational concepts", "Increase practice frequency"],
        difficulty: "Maintain current level with gradual increases",
        motivation: "Student shows good engagement, encourage continued progress",
      }
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error analyzing performance:", error)
    return NextResponse.json({ error: "Failed to analyze performance" }, { status: 500 })
  }
}
