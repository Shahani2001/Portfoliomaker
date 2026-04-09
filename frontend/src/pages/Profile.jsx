import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Calendar, Star, Code, Briefcase, Users, Award } from 'lucide-react';
import ApiClient from '../utils/api';

const Profile = () => {
  const { username } = useParams();

  const { data: portfolio, isLoading, error } = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      const api = new ApiClient();
      return api.get(`/portfolio/${username}`);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Profile not found</h1>
          <p className="text-gray-600 mb-8">The portfolio you're looking for doesn't exist.</p>
          <Link to="/" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Users className="w-24 h-24 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900">No Profile Data</h2>
          <p className="text-gray-600 mt-2">Portfolio data not found. <Link to="/dashboard" className="text-indigo-600 hover:underline">Go to Dashboard</Link></p>
        </div>
      </div>
    );
  }

  // Safe skills handler - now array
  const skillsList = Array.isArray(portfolio.skills) ? portfolio.skills.filter(s => s && s.trim()) : (portfolio.skills ? portfolio.skills.split(',').map(s => s.trim()).filter(s => s) : []);
  const featuredSkills = skillsList.slice(0, 4);

  return (
    <div className="min-h-screen py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-block w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 mb-8 shadow-2xl">
            <img 
              src={portfolio.profileImage || '/api/placeholder/128/128'} 
              alt={portfolio.fullName} 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-4">
            {portfolio.fullName}
          </h1>
          <p className="text-2xl font-semibold text-gray-600 mb-2">{portfolio.title}</p>
          <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-500 mb-12">
            {portfolio.github && (
              <Link to={portfolio.github} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                GitHub
              </Link>
            )}
            {portfolio.linkedin && (
              <Link to={portfolio.linkedin} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                LinkedIn
              </Link>
            )}
            {portfolio.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {portfolio.location}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all h-16 flex items-center justify-center"
            >
              Hire {portfolio.fullName.split(' ')[0]}
            </Link>
            {portfolio.github && (
              <Link
                to={portfolio.github}
                className="px-8 py-4 border-2 border-gray-200 text-gray-900 font-semibold rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all h-16 flex items-center justify-center"
              >
                View GitHub
              </Link>
            )}
          </div>
        </div>

        {/* About & Skills */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8 flex items-center gap-4">
                <Code className="w-12 h-12" />
                About
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {portfolio.bio || `${portfolio.fullName} is a passionate developer creating amazing things with code.`}
              </p>
            </div>

            {skillsList.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill, index) => (
                    <span key={index} className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 font-semibold rounded-2xl text-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white/70 border border-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Mail className="w-7 h-7" />
                Contact
              </h3>
              <div className="space-y-4 text-lg">
                {portfolio.contact?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a href={`mailto:${portfolio.contact.email}`} className="text-gray-700 hover:text-indigo-600">{portfolio.contact.email}</a>
                  </div>
                )}
                {portfolio.github && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111 .793-.261 .793-.577v-2.234c-3.338 .726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745 .083-.729 .083-.729 1.205 .084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 .997 .107-.775 .418-1.305 .762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311 .469-2.381 1.236-3.221-.035-.303-.535-1.523 .117-3.176 0 0 1.008-.322 3.301 1.23 .957-.266 1.983-.399 3.003-.404 1.02 .005 2.047 .138 3.006 .404 2.291-1.552 3.297-1.23 3.297-1.23 .653 1.653 .152 2.873 .118 3.176 .766 .84 1.233 1.91 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921 .43 .372 .823 1.102 .823 2.222v3.293c0 .319 .192 .694 .801 .576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <Link to={portfolio.github} className="text-gray-700 hover:text-indigo-600">{portfolio.github}</Link>
                  </div>
                )}
                {portfolio.contact?.linkedin && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-5.923v-4.281c0-.954-.043-2.18-1.329-2.98 .861-.281 1.834-.967 1.834-2.002 0-1.74-.883-3.159-2.492-3.159 .944-.068 1.8 .162 2.563 .723v-2.218l-3.37-.001c-.441-.007-.888 .21-1.172 .577-.284 .367-.456 .879-.456 .1 .44v-.001c0 .001 .001 .002 .001 .003v2.218c.763-.56 1.619-.723 2.563-.723-1.61 0-2.917 1.419-2.917 3.159 0 1.036 .373 1.721 1.834 2.002-1.286 .8-1.329 2.026-1.329 2.98v4.281h-5.923V12H2v8.452h5.923V20c0 .652 .529 1.18 1.18 1.18h7.344c.651 0 1.18-.528 1.18-1.18v-1.728z"/>
                    </svg>
                    <Link to={portfolio.contact.linkedin} className="text-gray-700 hover:text-blue-600">{portfolio.contact.linkedin}</Link>
                  </div>
                )}
              </div>
            </div>

            {featuredSkills.length > 0 && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-7 h-7 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-gray-900">Featured Skills</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {featuredSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                      <span className="font-semibold text-gray-900">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-24">
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-16 flex items-center gap-4 justify-center">
            <Code className="w-16 h-16" />
            Featured Projects
          </h2>
          {portfolio.projects && portfolio.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects.map((project, index) => (
                <div key={project._id || index} className="group rounded-3xl bg-white/70 border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all hover:bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Code className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.techStack?.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      {project.demoUrl && (
                        <Link to={project.demoUrl} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold">
                          Live Demo →
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link to={project.githubUrl} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <Code className="w-24 h-24 text-gray-300 mx-auto mb-8" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No projects yet</h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {portfolio.fullName} is working on some amazing projects. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Experience Section */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-16 flex items-center gap-4 justify-center">
              <Briefcase className="w-16 h-16" />
              Experience
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {portfolio.experience.map((exp, index) => (
                <div key={exp._id || index} className="flex gap-8 items-start p-8 rounded-3xl bg-white/70 border border-gray-200/50 hover:shadow-xl transition-all">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mt-2">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{exp.description}</p>
                    {exp.technologies && (
                      <div className="flex gap-2 flex-wrap">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

