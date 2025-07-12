"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Zap,
  Globe,
  Shield,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function AboutPage() {
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
                <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/about" className="text-sm font-medium text-blue-600">
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">EdusBest</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing education through AI-powered personalized learning. 
              Our mission is to make quality education accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At EdusBest, we believe that every student deserves a personalized learning 
                experience that adapts to their unique needs, pace, and learning style. 
                Our AI-powered platform bridges educational gaps and empowers students 
                to achieve their full potential.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're committed to making quality education accessible to underserved 
                communities worldwide, using cutting-edge technology to create meaningful 
                learning experiences that drive real results.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/student">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning</h3>
                <p className="text-gray-600">AI-driven pathways that adapt to each student's needs</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <Zap className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
                <p className="text-gray-600">Instant insights into learning progress and gaps</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <Globe className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Access</h3>
                <p className="text-gray-600">Quality education available anywhere, anytime</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <Shield className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                <p className="text-gray-600">Your data and privacy are our top priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform creates a personalized learning experience 
              that evolves with each student's progress and needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered Assessment</h3>
              <p className="text-gray-600 mb-6">
                Our advanced AI algorithms analyze your learning patterns, strengths, 
                and areas for improvement to create a personalized learning profile.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Learning style identification
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Knowledge gap analysis
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Adaptive difficulty adjustment
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Dynamic Content Generation</h3>
              <p className="text-gray-600 mb-6">
                Based on your profile, our system generates customized content, 
                exercises, and learning materials that match your pace and preferences.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Personalized lesson plans
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Interactive exercises
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time feedback
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Continuous Optimization</h3>
              <p className="text-gray-600 mb-6">
                The system continuously learns from your interactions and adjusts 
                the learning path to maximize your progress and retention.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Progress tracking
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Adaptive recommendations
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Performance analytics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Students Worldwide</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">85%</div>
              <div className="text-blue-100">Learning Improvement</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">60%</div>
              <div className="text-blue-100">Time Reduction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're a passionate team of educators, technologists, and innovators 
              dedicated to transforming education through technology.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Education Experts</h3>
              <p className="text-gray-600">
                Our team includes experienced educators and learning specialists 
                who understand the challenges of modern education.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Brain className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">AI Specialists</h3>
              <p className="text-gray-600">
                Leading machine learning engineers and data scientists who develop 
                cutting-edge AI algorithms for personalized learning.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Product Designers</h3>
              <p className="text-gray-600">
                UX/UI experts who create intuitive, engaging learning experiences 
                that students love to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience the Future of Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their education 
            with EdusBest's AI-powered platform.
          </p>
          <Link href="/student">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 