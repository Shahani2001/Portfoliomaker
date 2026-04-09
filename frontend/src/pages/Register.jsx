import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Mail, Lock, Link2, Code, Image } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ApiClient from '../utils/api';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const api = new ApiClient();
      const response = await api.post('/auth/register', data);
      
      login(response.user, response.token);
      navigate('/create');
    } catch (error) {
      console.error('Registration error:', error.message);
      alert(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-8 space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="md:text-7xl text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300 mb-6 leading-tight text-black dark:text-white">
                Create Account
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Min 3 characters' } })}
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="johndoe"
                  />
                </div>
                {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Title
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('title')}
                      className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="Full Stack Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-5.923v-4.281c0-.954-.043-2.18-1.329-2.98.861-.281 1.834-.967 1.834-2.002 0-1.74-.883-3.159-2.492-3.159.944-.068 1.8.162 2.563.723v-2.218l-3.37-.001c-.441-.007-.888.21-1.172.577-.284.367-.456.879-.456.1.44v-.001c0 .001.001 .002.001 .003v2.218c.763-.56 1.619-.723 2.563-.723-1.61 0-2.917 1.419-2.917 3.159 0 1.036.373 1.721 1.834 2.002-1.286.8-1.329 2.026-1.329 2.98v4.281h-5.923V12H2v8.452h5.923V20c0 .652.529 1.18 1.18 1.18h7.344c.651 0 1.18-.528 1.18-1.18v-1.728z"/>
                    </svg>
                    <input
                      {...register('linkedin')}
                      className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    GitHub
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.035-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.152 2.873.118 3.176.766.84 1.233 1.91 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <input
                      {...register('github')}
                      className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Skills (comma separated)
                  </label>
                  <input
                    {...register('skills')}
                    className="w-full px-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="React, Node.js, MongoDB, Tailwind"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Profile Image URL (optional)
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('profileImage')}
                      className="w-full pl-11 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account & Portfolio'
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
