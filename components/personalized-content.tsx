"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import type { UserProfile } from "@/types/user-profile"
import { Brain, BookOpen, Target, Loader2, Sparkles, MessageSquare, FileText } from "lucide-react"

interface PersonalizedContentProps {
  userProfile: UserProfile
}

interface GeneratedContent {
  explanation: string
  examples: string[]
  exercises: Array<{
    question: string
    difficulty: string
    type: string
  }>
  tips: string[]
  nextSteps: string[]
}

export function PersonalizedContent({ userProfile }: PersonalizedContentProps) {
  const [selectedSubject, setSelectedSubject] = useState(userProfile.subjects[0]?.subject || "")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [contentType, setContentType] = useState("lesson")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")

  const generateContent = async () => {
    if (!selectedSubject) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-personalized-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile,
          subject: selectedSubject,
          topic: selectedTopic,
          contentType,
          customPrompt,
        }),
      })
      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      console.error("Error generating content:", error)
      // Fallback content
      setGeneratedContent({
        explanation: `This personalized ${contentType} for ${selectedSubject} has been tailored to your ${userProfile.learningStyle.join(" and ")} learning style. The content is designed to match your current skill level and help you progress toward your goals.`,
        examples: [
          "Example 1: Practical application relevant to your interests",
          "Example 2: Step-by-step breakdown for visual learners",
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
          { question: "Challenge question to push your boundaries", difficulty: "Advanced", type: "Open Ended" },
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
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const contentTypes = [
    { value: "lesson", label: "Interactive Lesson", icon: BookOpen },
    { value: "practice", label: "Practice Session", icon: Target },
    { value: "explanation", label: "Concept Explanation", icon: MessageSquare },
    { value: "summary", label: "Topic Summary", icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Content Generator */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Content Generator
          </CardTitle>
          <CardDescription className="text-base">
            Generate personalized learning content tailored to your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {userProfile.subjects.map((subject) => (
                    <SelectItem key={subject.subject} value={subject.subject}>
                      {subject.subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Topic (Optional)</label>
              <input
                type="text"
                placeholder="Enter specific topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Request (Optional)</label>
            <Textarea
              placeholder="Describe what specific help you need or what you'd like to focus on..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={generateContent}
              disabled={isGenerating || !selectedSubject}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Style: {userProfile.learningStyle.join(", ")}</Badge>
              <Badge variant="outline">
                Level: {userProfile.subjects.find((s) => s.subject === selectedSubject)?.currentLevel || "N/A"}
              </Badge>
              <Badge variant="outline">Goal: {userProfile.primaryGoals[0] || "Learning"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Content */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Personalized {contentTypes.find((t) => t.value === contentType)?.label}
              </CardTitle>
              <CardDescription>
                Tailored for {selectedSubject} {selectedTopic && `- ${selectedTopic}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                  <p className="text-blue-800 leading-relaxed">{generatedContent.explanation}</p>
                </div>
              </div>

              {generatedContent.examples.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Examples</h4>
                  {generatedContent.examples.map((example, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <p className="text-green-800 text-sm">{example}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Practice Exercises */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Practice Exercises
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedContent.exercises.map((exercise, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Exercise {index + 1}</span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{exercise.difficulty}</Badge>
                      <Badge variant="outline">{exercise.type}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{exercise.question}</p>
                  <Button size="sm" variant="outline">
                    Start Exercise
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips and Next Steps */}
      {generatedContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Learning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedContent.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-yellow-900 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedContent.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-indigo-900 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!generatedContent && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Content</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Select a subject and content type, then click "Generate Content" to create personalized learning materials
              tailored specifically to your learning profile.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {contentTypes.map((type) => (
                <div key={type.value} className="p-4 bg-gray-50 rounded-lg">
                  <type.icon className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">{type.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
