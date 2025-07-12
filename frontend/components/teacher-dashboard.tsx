"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, AlertTriangle, BookOpen, Brain, Target } from "lucide-react"

const classData = {
  totalStudents: 28,
  activeStudents: 26,
  averageProgress: 76,
  strugglingStudents: 4,
}

const students = [
  { id: 1, name: "Alex Johnson", progress: 78, status: "on-track", weakAreas: ["Algebra"], strengths: ["Geometry"] },
  {
    id: 2,
    name: "Sarah Chen",
    progress: 92,
    status: "advanced",
    weakAreas: [],
    strengths: ["Problem Solving", "Analysis"],
  },
  {
    id: 3,
    name: "Marcus Williams",
    progress: 45,
    status: "struggling",
    weakAreas: ["Basic Math", "Word Problems"],
    strengths: ["Visual Learning"],
  },
  { id: 4, name: "Emma Davis", progress: 83, status: "on-track", weakAreas: ["Fractions"], strengths: ["Mental Math"] },
  {
    id: 5,
    name: "James Rodriguez",
    progress: 38,
    status: "struggling",
    weakAreas: ["Algebra", "Equations"],
    strengths: ["Geometry"],
  },
]

const aiInsights = [
  {
    type: "recommendation",
    title: "Adaptive Content Suggestion",
    description: "3 students would benefit from visual learning materials for quadratic equations",
    priority: "medium",
  },
  {
    type: "alert",
    title: "Learning Gap Detected",
    description: "Marcus Williams and James Rodriguez need additional support in foundational algebra",
    priority: "high",
  },
  {
    type: "success",
    title: "Engagement Improvement",
    description: "Class engagement increased 23% after implementing personalized learning paths",
    priority: "low",
  },
]

export function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "advanced":
        return "bg-green-100 text-green-800"
      case "on-track":
        return "bg-blue-100 text-blue-800"
      case "struggling":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
          <p className="text-gray-600">10th Grade Mathematics • Room 204</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classData.totalStudents}</div>
              <p className="text-xs text-muted-foreground">{classData.activeStudents} active today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classData.averageProgress}%</div>
              <Progress value={classData.averageProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Support</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{classData.strugglingStudents}</div>
              <p className="text-xs text-muted-foreground">Students below 50%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">New recommendations</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Student Overview</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Progress</CardTitle>
                    <CardDescription>Individual student performance and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{student.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getStatusColor(student.status)}>
                                  {student.status.replace("-", " ")}
                                </Badge>
                                <span className="text-sm text-gray-500">{student.progress}% complete</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Progress value={student.progress} className="w-24 mb-1" />
                            <p className="text-xs text-gray-500">{student.weakAreas.length} weak areas</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                {selectedStudent ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedStudent.name}</CardTitle>
                      <CardDescription>Detailed student profile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Progress</h4>
                        <Progress value={selectedStudent.progress} className="mb-1" />
                        <p className="text-xs text-gray-600">{selectedStudent.progress}% complete</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedStudent.strengths.map((strength: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Areas for Improvement</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedStudent.weakAreas.map((area: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <Button size="sm" className="w-full">
                          <Target className="mr-2 h-4 w-4" />
                          Create Custom Path
                        </Button>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          <Brain className="mr-2 h-4 w-4" />
                          AI Recommendations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 text-center">
                        Select a student to view detailed information and AI-powered insights
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Powered Teaching Insights
                  </CardTitle>
                  <CardDescription>
                    Automated analysis and recommendations based on student performance data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className={`p-4 border rounded-lg ${getPriorityColor(insight.priority)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-700">{insight.description}</p>
                          </div>
                          <Badge variant="outline" className="ml-4">
                            {insight.priority} priority
                          </Badge>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">Take Action</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  AI Content Generation
                </CardTitle>
                <CardDescription>Generate personalized learning materials for your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Content Management</h3>
                  <p className="text-gray-600 mb-4">
                    Create and manage AI-generated learning materials tailored to your students' needs
                  </p>
                  <Button>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate New Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
