"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, TrendingUp, Clock, Award } from "lucide-react";
import { AdaptiveLearningPath } from "./adaptive-learning-path";
import { PersonalizedContent } from "./personalized-content";
import { ProgressAnalytics } from "./progress-analytics";
import { useData } from "@/context/DataContext";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export function StudentDashboard() {
  const { studentData } = useData();

  // Set initial subject, defaulting to the first one if available
  const [selectedSubject, setSelectedSubject] = useState(
    studentData?.profile.subjects[0]?.subject || ""
  );

  // Loading state while data is fetched from localStorage
  if (!studentData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-4">Loading student profile...</p>
          <p className="text-sm text-gray-500 mb-4">
            If you're new, please start from the homepage.
          </p>
          <Link href="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { profile, activities, stats } = studentData;

  // Calculate overall progress dynamically
  const overallProgress =
    profile.subjects.length > 0
      ? profile.subjects.reduce((acc, subject) => {
          const progress = (subject.currentLevel / subject.targetLevel) * 100;
          return acc + progress;
        }, 0) / profile.subjects.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-gray-600">
            {profile.gradeLevel} • {profile.difficultyPreference} Level •{" "}
            {profile.learningStyle.join(", ")} Learner
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(overallProgress)}%
              </div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Streak
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Points
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalPoints.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {activities
                  .slice(0, 5)
                  .reduce((acc, act) => acc + (act.score || 10), 0)}{" "}
                this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subjects
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile.subjects.length}
              </div>
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
            <AdaptiveLearningPath userProfile={profile} />
          </TabsContent>

          <TabsContent value="adaptive-content">
            <PersonalizedContent
              userProfile={profile}
              onSubjectChange={setSelectedSubject}
              selectedSubject={selectedSubject}
            />
          </TabsContent>

          <TabsContent value="performance">
            <ProgressAnalytics userProfile={profile} />
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Recent Learning Activities</CardTitle>
                <CardDescription>
                  Your latest completed lessons and assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold">{activity.topic}</h4>
                            <p className="text-sm text-gray-600">
                              {activity.subject} -{" "}
                              <span className="capitalize">
                                {activity.type}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && (
                            <div className="font-semibold text-lg">
                              {activity.score}%
                            </div>
                          )}
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(
                              new Date(activity.completedAt),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No activities yet. Start a lesson to see your progress!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
