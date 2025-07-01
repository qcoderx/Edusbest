"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, TrendingUp, Clock, Award } from "lucide-react"
import { LearningPath } from "./learning-path"
import { PerformanceChart } from "./performance-chart"
import { AdaptiveContent } from "./adaptive-content"

// Mock student data
const studentData = {
  name: "Alex Johnson",
  grade: "10th Grade",
  subjects: ["Mathematics", "Science", "English", "History"],
  currentLevel: "Intermediate",
  learningStyle: "Visual",
  weakAreas: ["Algebra", "Essay Writing"],
  strengths: ["Geometry", "Reading Comprehension"],
  overallProgress: 78,
  streakDays: 12,
  totalPoints: 2450,
}

const recentActivities = [
  { subject: "Mathematics", topic: "Quadratic Equations", score: 85, time: "2 hours ago" },
  { subject: "Science", topic: "Chemical Reactions", score: 92, time: "1 day ago" },
  { subject: "English", topic: "Essay Structure", score: 76, time: "2 days ago" },
  { subject: "History", topic: "World War II", score: 88, time: "3 days ago" },
]

export function StudentDashboard() {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {studentData.name}!</h1>
          <p className="text-gray-600">
            {studentData.grade} • {studentData.currentLevel} Level • {studentData.learningStyle} Learner
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.overallProgress}%</div>
              <Progress value={studentData.overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.streakDays} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+150 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.subjects.length}</div>
              <p className="text-xs text-muted-foreground">All on track</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learning-path" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
            <TabsTrigger value="adaptive-content">AI Content</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="learning-path">
            <LearningPath studentData={studentData} />
          </TabsContent>

          <TabsContent value="adaptive-content">
            <AdaptiveContent
              studentData={studentData}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
            />
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart />
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Personalized recommendations based on your performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-700">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {studentData.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-700">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-2">
                      {studentData.weakAreas.map((area, index) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full">
                      <Brain className="mr-2 h-4 w-4" />
                      Get Detailed AI Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Recent Learning Activities</CardTitle>
                <CardDescription>Your latest completed lessons and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <h4 className="font-semibold">{activity.topic}</h4>
                          <p className="text-sm text-gray-600">{activity.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">{activity.score}%</div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
