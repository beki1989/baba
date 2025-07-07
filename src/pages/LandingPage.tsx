import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Shield, 
  Globe, 
  Award, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Create, organize, and manage courses with ease. Upload materials, schedule assignments, and track progress.'
    },
    {
      icon: Users,
      title: 'Multi-University Support',
      description: 'Support for multiple universities with isolated environments and custom branding for each institution.'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with role-based access control, 2FA, and data encryption.'
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: 'Mobile-responsive design ensures access from any device, anywhere, anytime.'
    },
    {
      icon: Award,
      title: 'Assessment Tools',
      description: 'Comprehensive assessment and grading tools with automated feedback and analytics.'
    },
    {
      icon: Zap,
      title: 'Real-time Collaboration',
      description: 'Interactive forums, messaging, and collaboration tools for enhanced learning experience.'
    }
  ];

  const universities = [
    'Semera University', 'Gondar University', 'Bahir Dar University', 'Debrebirhan University',
    'Debremarkos University', 'Debretabor University', 'WOLLO University', 'Woldiya University',
    'Debark University', 'Mekdela Amba University', 'Injibara University', 'Haramaya University',
    'Ambo University', 'Jimma University', 'Bule Horra University', 'Meda Welabu University',
    'Metu University', 'Wollega University', 'Arsi University', 'Oda Bultum University',
    'Selale University', 'Demba Dolo University', 'Jigiga University', 'Kebri Dehar University',
    'Asossa University', 'Arba Minch University', 'Hawassa University', 'Dilla University',
    'Mizan-Tepi University', 'Wachamo University', 'Wolayita Sodo University', 'Welketie University',
    'Bonga University', 'Werabe University', 'Jinka University', 'Gambella University',
    'Borana University', 'Defense University'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Bics"
              />
              <span className="ml-3 text-2xl font-bold text-primary-600">Bics</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-yellow-300">Bics</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
              The most comprehensive Learning Management System designed specifically for Ethiopian universities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center">
                Start Learning Today
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/creator-signup" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                Creator Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to deliver exceptional educational experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <feature.icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Universities
            </h2>
            <p className="text-xl text-gray-600">
              Supporting education across Ethiopia
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {universities.slice(0, 16).map((university, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-primary-50 transition-colors duration-200">
                <p className="text-sm font-medium text-gray-700">{university}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">And {universities.length - 16} more universities...</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and educators already using Bics to enhance their educational journey.
          </p>
          <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
            Get Started Now
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img
                  className="h-8 w-auto"
                  src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Bics"
                />
                <span className="ml-2 text-xl font-bold">Bics</span>
              </div>
              <p className="text-gray-400">
                Empowering education through innovative technology solutions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Universities</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bics Educational Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}