"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { UserProfile } from "@/types/user-profile"
import { CheckCircle, Circle, Lock, Play, Brain, Target, Clock, Star } from "lucide-react"

interface AdaptiveLearningPathProps {
  userProfile: UserProfile
}

interface LearningModule {
  id: string
  title: string
  subject: string
  difficulty: number
  estimatedTime: number
  status: "completed" | "current" | "available" | "locked"
  progress: number
  adaptiveReason: string
  prerequisites: string[]
}

export function AdaptiveLearningPath({ userProfile }: AdaptiveLearningPathProps) {
  const [learningModules, setLearningModules] = useState<LearningModule[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    generateAdaptivePath()
  }, [userProfile])

  const generateAdaptivePath = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-learning-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfile }),
      })
      const data = await response.json()
      setLearningModules(data.modules || generateMockModules())
    } catch (error) {
      console.error("Error generating learning path:", error)
      setLearningModules(generateMockModules())
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMockModules = (): LearningModule[] => {
    const modules: LearningModule[] = []

    userProfile.subjects.forEach((subject, subjectIndex) => {
      const subjectModules = [
        {
          id: `${subject.subject}-1`,
          title: `${subject.subject} Fundamentals Review`,
          subject: subject.subject,
          difficulty: Math.max(1, subject.currentLevel - 1),
          estimatedTime: 30,
          status: "completed" as const,
          progress: 100,
          adaptiveReason: "Building strong foundation based on your current level",
          prerequisites: [],
        },
        {
          id: `${subject.subject}-2`,
          title: `Intermediate ${subject.subject} Concepts`,
          subject: subject.subject,
          difficulty: subject.currentLevel,
          estimatedTime: 45,
          status: subjectIndex === 0 ? ("current" as const) : ("available" as const),
          progress: subjectIndex === 0 ? 65 : 0,
          adaptiveReason: `Tailored to your ${userProfile.learningStyle.join(", ")} learning style`,
          prerequisites: [`${subject.subject}-1`],
        },
        {
          id: `${subject.subject}-3`,
          title: `Advanced ${subject.subject} Applications`,
          subject: subject.subject,
          difficulty: subject.currentLevel + 1,
          estimatedTime: 60,
          status: "available" as const,
          progress: 0,
          adaptiveReason: "Preparing you for your target level",
          prerequisites: [`${subject.subject}-2`],
        },
        {
          id: `${subject.subject}-4`,
          title: `${subject.subject} Mastery Challenge`,
          subject: subject.subject,
          difficulty: subject.targetLevel,
          estimatedTime: 90,
          status: "locked" as const,
          progress: 0,
          adaptiveReason: "Final challenge to reach your goal",
          prerequisites: [`${subject.subject}-3`],
        },
      ]
      modules.push(...subjectModules)
    })

    return modules
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "current":
        return <Play className="h-5 w-5 text-blue-500" />
      case "available":
        return <Circle className="h-5 w-5 text-gray-400" />
      case "locked":
        return <Lock className="h-5 w-5 text-gray-300" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return "bg-green-100 text-green-800"
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800"
    if (difficulty <= 8) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 3) return "Beginner"
    if (difficulty <= 6) return "Intermediate"
    if (difficulty <= 8) return "Advanced"
    return "Expert"
  }

  if (isGenerating) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Brain className="h-12 w-12 text-indigo-500 animate-pulse mb-4" />
          <h3 className="text-lg font-semibold mb-2">Generating Your Adaptive Learning Path</h3>
          <p className="text-gray-600 text-center">
            Our AI is analyzing your profile to create the perfect learning sequence...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Path Overview */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600" />
            Your Adaptive Learning Path
          </CardTitle>
          <CardDescription className="text-base">
            Personalized based on your learning style ({userProfile.learningStyle.join(", ")}), available time (
            {userProfile.availableHours}h/week), and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Target className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-600">
                {learningModules.filter((m) => m.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Completed Modules</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {Math.round(learningModules.reduce((acc, m) => acc + (m.progress / 100) * m.estimatedTime, 0))}h
              </div>
              <div className="text-sm text-gray-600">Time Invested</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{userProfile.subjects.length}</div>
              <div className="text-sm text-gray-600">Active Subjects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules by Subject */}
      {userProfile.subjects.map((subject) => {
        const subjectModules = learningModules.filter((m) => m.subject === subject.subject)
        const subjectProgress = subjectModules.reduce((acc, m) => acc + m.progress, 0) / subjectModules.length

        return (
          <Card key={subject.subject} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{subject.subject}</CardTitle>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">
                    Level {subject.currentLevel} → {subject.targetLevel}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="font-semibold">{Math.round(subjectProgress)}%</div>
                  </div>
                </div>
              </div>
              <Progress value={subjectProgress} className="mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">{getStatusIcon(module.status)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{module.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {getDifficultyLabel(module.difficulty)}
                          </Badge>
                          <span className="text-sm text-gray-500">{module.estimatedTime}min</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{module.adaptiveReason}</p>

                      {module.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {module.status === "current" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Continue
                        </Button>
                      )}
                      {module.status === "available" && (
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      )}
                      {module.status === "completed" && (
                        <Button size="sm" variant="ghost">
                          Review
                        </Button>
                      )}
                      {module.status === "locked" && (
                        <Button size="sm" variant="ghost" disabled>
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Adaptive Insights */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Adaptive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Learning Style Optimization</h4>
              <p className="text-sm text-blue-800">
                Your path includes{" "}
                {userProfile.learningStyle.includes("visual") ? "visual diagrams and infographics" : ""}
                {userProfile.learningStyle.includes("auditory") ? "audio explanations and discussions" : ""}
                {userProfile.learningStyle.includes("kinesthetic") ? "interactive exercises and simulations" : ""}
                to match your preferred learning style.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Difficulty Adaptation</h4>
              <p className="text-sm text-green-800">
                Based on your {userProfile.difficultyPreference} preference, we've adjusted the learning curve to
                provide optimal challenge without overwhelming you.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Time Optimization</h4>
              <p className="text-sm text-purple-800">
                Sessions are designed for {userProfile.preferredSessionLength} minutes to match your attention span of{" "}
                {userProfile.attentionSpan} minutes.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Goal Alignment</h4>
              <p className="text-sm text-orange-800">
                Your path prioritizes {userProfile.primaryGoals.slice(0, 2).join(" and ")}
                to help you achieve your learning objectives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
