"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { UserProfile } from "@/types/user-profile"
import { TrendingUp, Clock, Brain, BookOpen } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface ProgressAnalyticsProps {
  userProfile: UserProfile
}

export function ProgressAnalytics({ userProfile }: ProgressAnalyticsProps) {
  // Generate mock progress data based on user profile
  const generateProgressData = () => {
    const weeks = []
    for (let i = 1; i <= 8; i++) {
      const weekData: any = { week: `Week ${i}` }
      userProfile.subjects.forEach((subject) => {
        // Simulate progress based on subject priority and current level
        const baseProgress = subject.currentLevel * 10
        const weeklyGrowth = subject.priority * 2 + Math.random() * 5
        weekData[subject.subject] = Math.min(100, baseProgress + weeklyGrowth * i)
      })
      weeks.push(weekData)
    }
    return weeks
  }

  const generateSkillRadarData = () => {
    return userProfile.subjects.map((subject) => ({
      subject: subject.subject.slice(0, 10), // Truncate for display
      current: subject.currentLevel * 10,
      target: subject.targetLevel * 10,
      fullMark: 100,
    }))
  }

  const generateTimeSpentData = () => {
    return userProfile.subjects.map((subject) => ({
      subject: subject.subject.slice(0, 15),
      planned: subject.weeklyHours,
      actual: subject.weeklyHours * (0.8 + Math.random() * 0.4), // Simulate actual vs planned
      efficiency: 75 + Math.random() * 20,
    }))
  }

  const progressData = generateProgressData()
  const skillRadarData = generateSkillRadarData()
  const timeSpentData = generateTimeSpentData()

  // Calculate overall metrics
  const overallProgress =
    userProfile.subjects.reduce((acc, subject) => {
      return acc + (subject.currentLevel / subject.targetLevel) * 100
    }, 0) / userProfile.subjects.length

  const totalPlannedHours = userProfile.subjects.reduce((acc, subject) => acc + subject.weeklyHours, 0)
  const averageEfficiency = timeSpentData.reduce((acc, item) => acc + item.efficiency, 0) / timeSpentData.length

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Overall Progress</p>
                <p className="text-3xl font-bold">{Math.round(overallProgress)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
            <div className="mt-3">
              <Progress value={overallProgress} className="bg-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Weekly Hours</p>
                <p className="text-3xl font-bold">{totalPlannedHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-green-200" />
            </div>
            <p className="text-green-100 text-sm mt-2">Across {userProfile.subjects.length} subjects</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Learning Efficiency</p>
                <p className="text-3xl font-bold">{Math.round(averageEfficiency)}%</p>
              </div>
              <Brain className="h-8 w-8 text-purple-200" />
            </div>
            <p className="text-purple-100 text-sm mt-2">Above average!</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Active Subjects</p>
                <p className="text-3xl font-bold">{userProfile.subjects.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-200" />
            </div>
            <p className="text-orange-100 text-sm mt-2">All on track</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Your learning progress across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                {userProfile.subjects.map((subject, index) => (
                  <Line
                    key={subject.subject}
                    type="monotone"
                    dataKey={subject.subject}
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Skill Level Radar</CardTitle>
            <CardDescription>Current vs target skill levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Target" dataKey="target" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Time Analysis */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Time Investment Analysis</CardTitle>
          <CardDescription>Planned vs actual study time by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeSpentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="planned" fill="#3b82f6" name="Planned Hours" />
              <Bar dataKey="actual" fill="#10b981" name="Actual Hours" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Subject Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userProfile.subjects.map((subject, index) => {
          const subjectProgress = (subject.currentLevel / subject.targetLevel) * 100
          const timeEfficiency = timeSpentData[index]?.efficiency || 80

          return (
            <Card key={subject.subject} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {subject.subject}
                  <Badge variant="outline">Priority {subject.priority}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Goal</span>
                    <span>{Math.round(subjectProgress)}%</span>
                  </div>
                  <Progress value={subjectProgress} />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Level {subject.currentLevel}</span>
                    <span>Target: Level {subject.targetLevel}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{subject.weeklyHours}h</div>
                    <div className="text-xs text-blue-600">Weekly Goal</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{Math.round(timeEfficiency)}%</div>
                    <div className="text-xs text-green-600">Efficiency</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Adaptive Insights</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      •{" "}
                      {subjectProgress > 75
                        ? "Excellent progress! Consider increasing difficulty."
                        : "Steady progress. Stay consistent with current approach."}
                    </p>
                    <p>
                      •{" "}
                      {timeEfficiency > 85
                        ? "High efficiency detected. You're learning effectively!"
                        : "Consider adjusting study methods for better efficiency."}
                    </p>
                    <p>
                      •{" "}
                      {subject.weeklyHours > 5
                        ? "High time investment. Ensure adequate breaks."
                        : "Consider increasing study time if possible."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Learning Insights */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-600" />
            AI Learning Insights
          </CardTitle>
          <CardDescription>Personalized recommendations based on your progress data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Consistent study schedule adherence</li>
                <li>• Strong progress in {userProfile.subjects.find((s) => s.priority === 1)?.subject}</li>
                <li>• Effective {userProfile.learningStyle[0]} learning approach</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-orange-700 mb-2">Areas for Improvement</h4>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>
                  • Consider increasing{" "}
                  {userProfile.subjects.find((s) => s.priority === userProfile.subjects.length)?.subject} study time
                </li>
                <li>• Focus on weaker concepts before advancing</li>
                <li>• Implement more active recall techniques</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-blue-700 mb-2">Recommendations</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Maintain current {userProfile.preferredSessionLength}-minute sessions</li>
                <li>• Add review sessions for retention</li>
                <li>• Consider peer study groups</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
