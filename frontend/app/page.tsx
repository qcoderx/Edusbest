"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Users, 
  Loader2,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { OnboardingFlow } from "@/components/onboarding-flow";
import type { UserProfile } from "@/types/user-profile";
import { useData } from "@/context/DataContext";
import type { StudentData } from "@/types/learning-data";

export default function HomePage() {
  const { studentData, updateStudentData, resetStudentData } = useData();
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  // Render main landing page
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                EdusBest
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-sm font-medium text-blue-600">
                  Home
                </Link>
                <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  About
                </Link>
                <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/student">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Star className="h-4 w-4 mr-2" />
              #1 AI-Powered Learning Platform
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="text-blue-600"> Learning</span>
              <br />
              Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Personalized AI-driven education that adapts to your learning style, 
              pace, and goals. Join thousands of students achieving their dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/student">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EdusBest?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform delivers personalized learning experiences 
              that adapt to each student's unique needs and learning style.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Adaptation</h3>
              <p className="text-gray-600">
                Machine learning algorithms analyze your performance to create 
                personalized learning paths that evolve with you.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Real-time analytics track your learning progress and identify 
                areas that need attention with detailed insights.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Adaptive Content</h3>
              <p className="text-gray-600">
                Dynamic content generation based on your learning preferences 
                and knowledge gaps for optimal retention.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inclusive Access</h3>
              <p className="text-gray-600">
                Designed to bridge educational gaps in underserved communities 
                worldwide with accessible, quality education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600 text-lg">Improvement in Learning Outcomes</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl font-bold text-green-600 mb-2">60%</div>
              <div className="text-gray-600 text-lg">Reduction in Learning Time</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-5xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600 text-lg">Students Served Worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already experiencing the future of education.
            Start your personalized learning journey today.
          </p>
          <Link href="/student">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">EdusBest</h3>
              <p className="text-gray-400">
                Transforming education through AI-powered personalized learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/student" className="hover:text-white">Student Dashboard</Link></li>
                <li><Link href="/teacher" className="hover:text-white">Teacher Portal</Link></li>
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Phone className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <MapPin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EdusBest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}