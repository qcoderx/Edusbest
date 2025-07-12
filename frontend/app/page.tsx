"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, TrendingUp, Users, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { OnboardingFlow } from "@/components/onboarding-flow";
import type { UserProfile } from "@/types/user-profile";
import { useData } from "@/context/DataContext";
import type { StudentData } from "@/types/learning-data";

export default function HomePage() {
  const { studentData, updateStudentData, resetStudentData } = useData();
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // This effect runs only once on the client after the component mounts.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // This effect determines whether to show the onboarding flow based on studentData.
  useEffect(() => {
    if (hasMounted) {
      if (!studentData) {
        setIsOnboarding(true);
      } else {
        setIsOnboarding(false);
      }
    }
  }, [studentData, hasMounted]);

  // Handler for when onboarding is completed
  const handleOnboardingComplete = (profile: UserProfile) => {
    const initialData: StudentData = {
      profile,
      contentLibrary: [],
      quizHistory: [],
      completedModules: [],
      stats: { streakDays: 0, totalPoints: 0 },
    };
    updateStudentData(initialData);
    setIsOnboarding(false);
  };

  // Handler to reset profile and re-start onboarding
  const handleResetProfile = () => {
    resetStudentData();
    setIsOnboarding(true);
  };

  // Render a loading state or null until the component has mounted on the client
  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render onboarding flow if needed
  if (isOnboarding || !studentData) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Render main page if profile exists
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Personalized Learning
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Adaptive learning pathways that adjust to each student's pace,
            learning style, and knowledge gaps using advanced AI algorithms.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/student">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Student Dashboard
              </Button>
            </Link>
            <Link href="/teacher">
              <Button size="lg" variant="outline">
                Teacher Portal
              </Button>
            </Link>
          </div>
          <Button
            size="sm"
            variant="link"
            onClick={handleResetProfile}
            className="mt-4"
          >
            Reset Profile and Start Onboarding
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>AI Adaptation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Machine learning algorithms analyze student performance to
                create personalized learning paths
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time analytics track learning progress and identify areas
                needing attention
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Adaptive Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dynamic content generation based on individual learning
                preferences and gaps
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Inclusive Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Designed to bridge educational gaps in underserved communities
                worldwide
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Platform Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">
                Improvement in Learning Outcomes
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
              <div className="text-gray-600">Reduction in Learning Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Students Served</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}