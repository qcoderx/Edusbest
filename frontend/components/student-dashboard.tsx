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
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

export function StudentDashboard() {
  const { studentData } = useData();
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 transition-colors duration-500 animate-gradient-move p-6">
      <div className="max-w-7xl mx-auto w-full animate-fade-in">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div></div> {/* Spacer */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 drop-shadow-md" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400 drop-shadow-md" />
            )}
          </Button>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 tracking-tight animate-fade-in">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 animate-fade-in delay-100">
            {profile.gradeLevel} • {profile.difficultyPreference} Level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 animate-fade-in delay-200">
          {/* Card: Overall Progress */}
          <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 animate-bounce-slow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Overall Progress</CardTitle>
              <TrendingUp className="h-5 w-5 text-indigo-500 dark:text-indigo-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">
                {Math.round(overallProgress)}%
              </div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>

          {/* Card: Learning Streak */}
          <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 animate-bounce-slow delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Learning Streak</CardTitle>
              <Clock className="h-5 w-5 text-purple-500 dark:text-purple-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-purple-700 dark:text-purple-300">{stats.streakDays} days</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Keep it up!</p>
            </CardContent>
          </Card>

          {/* Card: Total Points */}
          <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 animate-bounce-slow delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Total Points</CardTitle>
              <Award className="h-5 w-5 text-yellow-500 dark:text-yellow-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-yellow-700 dark:text-yellow-300">
                {stats.totalPoints.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">from lessons and quizzes</p>
            </CardContent>
          </Card>

          {/* Card: Active Subjects */}
          <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 animate-bounce-slow delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Active Subjects</CardTitle>
              <BookOpen className="h-5 w-5 text-green-500 dark:text-green-400 drop-shadow-md" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-green-700 dark:text-green-300">
                {profile.subjects.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">All on track</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="study-schedule" className="space-y-6 animate-fade-in delay-300">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow hover:shadow-lg transition-all">
            <TabsTrigger value="study-schedule" className="hover:scale-105 transition-transform">
              <Calendar className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400 drop-shadow-md" />
              Study Schedule
            </TabsTrigger>
            <TabsTrigger value="ai-generator" className="hover:scale-105 transition-transform">
              <Sparkles className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400 drop-shadow-md" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="content-library" className="hover:scale-105 transition-transform">
              <Notebook className="mr-2 h-5 w-5 text-green-500 dark:text-green-400 drop-shadow-md" />
              Content Library
            </TabsTrigger>
            <TabsTrigger value="performance" className="hover:scale-105 transition-transform">
              <TrendingUp className="mr-2 h-5 w-5 text-yellow-500 dark:text-yellow-400 drop-shadow-md" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study-schedule">
            <AdaptiveLearningPath userProfile={profile} />
          </TabsContent>

          <TabsContent value="ai-generator">
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
