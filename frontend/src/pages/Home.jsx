import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Code, Star, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-24">
        <div className="max-w-4xl mx-auto">
          
          <h1 className="text-5xl color:black dark:text-black md:text-7xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300 mb-6 leading-tight">
            Build Your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Portfolio</span> in Minutes
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-900 max-w-2xl mx-auto mb-12 leading-relaxed">
            Showcase your skills, projects, and experience with beautiful, professional portfolio websites. No design skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Link
              to="/create"
              className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-2xl hover:from-indigo-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 h-16"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard"
              className="group flex items-center justify-center px-8 py-4 border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white font-semibold text-lg rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:shadow-xl transition-all duration-300 h-16"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl color:black dark:text-black md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300 mb-6">
              Everything you need to impress
            </h2>
            <p className="text-xl color:black max-w-2xl mx-auto">
              From clean designs to powerful features, we've got it all covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white dark:hover:bg-gray-900">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Create beautiful portfolio pages that showcase your skills, projects, and experience in the best light.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Fully responsive design
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Custom domains
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  SEO optimized
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white dark:hover:bg-gray-900 relative overflow-hidden md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 -skew-x-12 -translate-x-20 group-hover:translate-x-0 transition-transform duration-700"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Full Developer Experience</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Complete CRUD functionality for portfolios with projects, experience, skills and social links.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                      Unlimited Projects
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      Add descriptions, tech stack, live demos & GitHub links
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Professional Experience
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      Timeline with company, role, duration & achievements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl color:black dark:text-black md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300 mb-6 ">
            Ready to showcase your work?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-900 mb-12">
            Join thousands of developers who use PortfolioMaker to create stunning professional portfolios.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-indigo-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
          >
            Create My Portfolio
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

