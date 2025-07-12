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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Calendar,
  Notebook,
  Sparkles,
} from "lucide-react";
import { AdaptiveLearningPath } from "./adaptive-learning-path";
import { PersonalizedContent } from "./personalized-content";
import { ProgressAnalytics } from "./progress-analytics";
import { ContentLibrary } from "./content-library";
import { useData } from "@/context/DataContext";
import Link from "next/link";

export function StudentDashboard() {
  const { studentData } = useData();

  // This state is crucial. It holds the subject the user has selected.
  const [selectedSubject, setSelectedSubject] = useState(
    studentData?.profile.subjects[0]?.subject || ""
  );

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

  const { profile, stats } = studentData;

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-gray-600">
            {profile.gradeLevel} • {profile.difficultyPreference} Level
          </p>
        </div>

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
                from lessons and quizzes
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

        <Tabs defaultValue="study-schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="study-schedule">
              <Calendar className="mr-2 h-4 w-4" />
              Study Schedule
            </TabsTrigger>
            <TabsTrigger value="ai-generator">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="content-library">
              <Notebook className="mr-2 h-4 w-4" />
              Content Library
            </TabsTrigger>
            <TabsTrigger value="performance">
              <TrendingUp className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study-schedule">
            <AdaptiveLearningPath userProfile={profile} />
          </TabsContent>

          <TabsContent value="ai-generator">
            {/* FIX: Pass the required props to the PersonalizedContent component */}
            <PersonalizedContent
              userProfile={profile}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
            />
          </TabsContent>

          <TabsContent value="content-library">
            <ContentLibrary />
          </TabsContent>

          <TabsContent value="performance">
            <ProgressAnalytics userProfile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
