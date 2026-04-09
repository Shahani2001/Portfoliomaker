import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { CheckCircle, ArrowLeft, Share2, Upload } from 'lucide-react';
import ApiClient from '../utils/api';

const PreviewPortfolio = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const api = new ApiClient(token);

  // Load form data from sessionStorage
  const previewData = React.useMemo(() => {
    try {
      const data = sessionStorage.getItem('portfolioPreviewData');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  const handlePublish = async () => {
    if (!previewData || !user?.username) {
      alert('No data to publish or user not logged in');
      return;
    }

    try {
      // Use user's username or generate from fullName
      const username = user.username || previewData.fullName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      await api.post('/portfolio', {
        ...previewData,
        username: username.toLowerCase(),
      });

      sessionStorage.removeItem('portfolioPreviewData');
      navigate(`/${username}`);
    } catch (error) {
      console.error('Publish failed:', error);
      alert('Failed to publish portfolio. Username may already exist.');
    }
  };

  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-gray-400 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Preview Data</h2>
          <p className="text-gray-600 mb-8">Go back to create your portfolio.</p>
          <Button onClick={() => navigate('/create')} className="bg-indigo-600 hover:bg-indigo-700">
            Create Portfolio
          </Button>
        </div>
      </div>
    );
  }

  // Safe data access
  const skillsList = previewData.skills?.filter(Boolean) || [];
  const projectsList = previewData.projects || [];
  const experienceList = previewData.experience || [];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/create')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Edit Form
          </Button>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Portfolio Preview
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This is how your portfolio will look like. Click publish to make it live at <strong>/{user?.username || 'yourusername'}</strong>
          </p>
        </div>

        {/* Profile Preview - Similar to Profile.jsx */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 mb-12">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-block w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 mb-8 shadow-2xl mx-auto">
              <img 
                src={previewData.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'} 
                alt={previewData.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-4">
              {previewData.fullName}
            </h1>
            <p className="text-2xl font-semibold text-gray-600 mb-6">{previewData.title}</p>
            <div className="flex flex-wrap justify-center gap-6 text-lg mb-12">
              {previewData.contact?.github && (
                <a href={previewData.contact.github} className="flex items-center gap-2 hover:text-indigo-600 transition-colors font-semibold">
                  GitHub
                </a>
              )}
              {previewData.contact?.linkedin && (
                <a href={previewData.contact.linkedin} className="flex items-center gap-2 hover:text-blue-600 transition-colors font-semibold">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* About */}
          {previewData.bio && (
            <section className="mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-4 justify-center">
                About Me
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                {previewData.bio}
              </p>
            </section>
          )}

          {/* Skills */}
          {skillsList.length > 0 && (
            <section className="mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4 justify-center">
                Skills
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {skillsList.map((skill, index) => (
                  <span key={index} className="px-8 py-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 font-bold rounded-3xl text-xl shadow-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projectsList.length > 0 && (
            <section className="mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-16 flex items-center gap-4 justify-center">
                Featured Projects
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsList.map((project, index) => (
                  <div key={index} className="group rounded-3xl bg-white/70 border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all hover:bg-white">
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform">
                      <img 
                        src={project.image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.name}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack?.split(',').map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.githubLink && (
                          <Button variant="outline" asChild>
                            <a href={project.githubLink} target="_blank">GitHub</a>
                          </Button>
                        )}
                        {project.liveDemo && (
                          <Button asChild>
                            <a href={project.liveDemo} target="_blank">Live Demo</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experienceList.length > 0 && (
            <section>
              <h2 className="text-5xl font-black text-gray-900 mb-16 flex items-center gap-4 justify-center">
                Experience
              </h2>
              <div className="max-w-4xl mx-auto space-y-8">
                {experienceList.map((exp, index) => (
                  <div key={index} className="flex gap-8 items-start p-8 rounded-3xl bg-white/70 border border-gray-200/50 hover:shadow-xl transition-all">
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mt-2">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.duration}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Preview */}
          {(previewData.contact?.email || previewData.contact?.linkedin || previewData.contact?.github) && (
            <section className="mt-16 pt-16 border-t border-gray-200/50">
              <h2 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-3 justify-center">
                <Mail className="w-12 h-12 text-emerald-600" />
                Get In Touch
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {previewData.contact?.email && (
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 border border-emerald-200/50 hover:shadow-lg transition-all">
                    <Mail className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <a href={`mailto:${previewData.contact.email}`} className="block text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                      {previewData.contact.email}
                    </a>
                  </div>
                )}
                {previewData.contact?.linkedin && (
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 border border-blue-200/50 hover:shadow-lg transition-all">
                    <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.552v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                    <a href={previewData.contact.linkedin} className="block text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
                {previewData.contact?.github && (
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 border border-gray-200/50 hover:shadow-lg transition-all">
                    <svg className="w-12 h-12 text-gray-700 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.3 3.438 9.8 8.205 11.385.6.105.82-.256.82-.57 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.982-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.64 1.653.14 2.873.117 3.176.77.84 1.235 1.912 1.235 3.22 0 4.6-2.805 5.626-5.475 5.92.43.372.823 1.101 .823 2.222v3.293c0 .319.193.694.8 .576 4.77-1.587 8.2-6.086 8.2-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <a href={previewData.contact.github} className="block text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Publish Actions */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handlePublish}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-6 px-12 text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all"
            >
              <Upload className="w-6 h-6" />
              Publish Portfolio
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create')}
              className="flex items-center gap-3 py-6 px-12 text-xl rounded-3xl border-2 border-gray-200 font-bold hover:bg-gray-50"
            >
              <ArrowLeft className="w-6 h-6" />
              Make Changes
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Your portfolio will be live at <strong>portfolio-maker.com/{user?.username || previewData.fullName.toLowerCase().replace(/\s+/g, '-')}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewPortfolio;

