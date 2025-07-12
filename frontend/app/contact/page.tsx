"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  ArrowRight,
  MessageSquare,
  Globe,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

export default function ContactPage() {
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
                <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                  About
                </Link>
                <Link href="/contact" className="text-sm font-medium text-blue-600">
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
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions about EdusBest? Want to learn more about our AI-powered 
              learning platform? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">hello@edusbest.com</p>
                    <p className="text-gray-600">support@edusbest.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">123 Innovation Drive</p>
                    <p className="text-gray-600">Tech City, TC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Contact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the Developer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              EdusBest was created by a passionate developer dedicated to transforming 
              education through innovative technology solutions.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center">
                    <MessageSquare className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Lasisi Quadri</h3>
                  <p className="text-blue-600 font-semibold mb-4">Lead Developer & Founder</p>
                  <p className="text-gray-600 mb-6">
                    A passionate full-stack developer with expertise in AI/ML, 
                    educational technology, and creating impactful digital solutions. 
                    Committed to making quality education accessible to everyone.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <Link href="#" className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-900">
                      <Github className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-blue-400">
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-blue-600">
                      <Globe className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Skills & Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React/Next.js</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Python/Django</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">AI/ML</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">TypeScript</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">PostgreSQL</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Tailwind CSS</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Current Focus</h4>
                    <p className="text-gray-600">
                      Developing AI-powered educational platforms, creating personalized 
                      learning experiences, and building scalable web applications.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Developer</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        quadri@edusbest.com
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-4 w-4 mr-2" />
                        lasisiquadri.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about EdusBest and our platform.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the AI-powered learning work?
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your learning patterns, strengths, and weaknesses to create 
                personalized learning paths that adapt to your pace and style.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is EdusBest free to use?
              </h3>
              <p className="text-gray-600">
                Yes! We offer a free forever plan with access to core features. 
                Premium features are available for advanced users.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What subjects are available?
              </h3>
              <p className="text-gray-600">
                We cover a wide range of subjects including Mathematics, Science, 
                Languages, Computer Science, and more. New subjects are added regularly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How can I get support?
              </h3>
              <p className="text-gray-600">
                You can reach our support team via email, phone, or through the 
                contact form above. We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already experiencing the future of education 
            with EdusBest's AI-powered platform.
          </p>
          <Link href="/student">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 