import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                PortfolioMaker
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Create beautiful portfolio websites with full CRUD functionality. Showcase your skills, projects and experience professionally.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Developers</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <span>hello@portfoliomaker.com</span>
              </div>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="w-10 h-10  hover:bg-gray-700 rounded-xl flex items-center justify-center transition-all hover:scale-105" rel="noopener noreferrer" target="_blank">
                  <img src="/src/assets/github.png" alt="GitHub" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10  hover:bg-gray-700 rounded-xl flex items-center justify-center transition-all hover:scale-105" rel="noopener noreferrer" target="_blank">
                  <img src="/src/assets/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10  hover:bg-gray-700 rounded-xl flex items-center justify-center transition-all hover:scale-105" rel="noopener noreferrer" target="_blank">
                  <img src="/src/assets/twitter.png" alt="Twitter" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
<p>&copy; {new Date().getFullYear()} PortfolioMaker</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

