import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Eye, ArrowLeft } from 'lucide-react';
import ApiClient from '../utils/api';

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const { user } = useAuth();


  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      title: '',
      bio: '',
      profileImage: '',
      contact: { email: '', linkedin: '', github: '', website: '' },
      skills: [],
      projects: [],
      experience: [],
    }
  });

  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: projectsFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const onSubmitPreview = (data) => {
    // Store form data in sessionStorage for Preview page
    sessionStorage.setItem('portfolioPreviewData', JSON.stringify(data));
    navigate('/preview');
  };

  if (!user) {
    navigate('/register');
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4 text-center">
            Create Your Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Fill out the form below to generate your professional portfolio page
          </p>

          <form onSubmit={handleSubmit(onSubmitPreview)} className="space-y-12">
            {/* Personal Info */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Users className="w-10 h-10 text-indigo-600" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
                  <input
                    {...register('title')}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                    placeholder="Full Stack Developer"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                  placeholder="Tell us about yourself and your passion for development..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image URL</label>
                <input
                  {...register('profileImage')}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Mail className="w-10 h-10 text-emerald-600" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" {...register('contact.email')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                  <input {...register('contact.linkedin')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50" placeholder="https://linkedin.com/in/username" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub</label>
                  <input {...register('contact.github')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-gray-500/20 focus:border-gray-500 transition-all bg-white/50" placeholder="https://github.com/username" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Website</label>
                  <input {...register('contact.website')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white/50" placeholder="https://yourwebsite.com" />
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Star className="w-10 h-10 text-amber-500" />
                Skills
              </h2>
              <div className="space-y-3">
                {skillsFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-end">
                    <input
                      {...register(`skills.${index}`)}
                      className="flex-1 p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-white/50"
                      placeholder="React"
                    />
                    <Button type="button" variant="outline" onClick={() => removeSkill(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendSkill('')} className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Code className="w-10 h-10 text-blue-600" />
                Projects
              </h2>
              <div className="space-y-4">
                {projectsFields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-2xl p-6 bg-white/50 space-y-4">
                    <input
                      {...register(`projects.${index}.name`)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Project Name"
                    />
                    <textarea
                      {...register(`projects.${index}.description`)}
                      rows={2}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Brief description..."
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        {...register(`projects.${index}.githubLink`)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500/20"
                        placeholder="GitHub URL"
                      />
                      <input
                        {...register(`projects.${index}.liveDemo`)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20"
                        placeholder="Live Demo URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack (comma separated)</label>
                      <input
                        {...register(`projects.${index}.techStack`)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="React, Node.js, Tailwind"
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={() => removeProject(index)} className="w-full md:w-auto">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Project
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendProject({})} className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Briefcase className="w-10 h-10 text-emerald-600" />
                Experience
              </h2>
              <div className="space-y-4">
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-2xl p-6 bg-white/50 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        {...register(`experience.${index}.company`)}
                        className="w-full p-4 border border-gray-200 rounded-xl"
                        placeholder="Company Name"
                      />
                      <input
                        {...register(`experience.${index}.role`)}
                        className="w-full p-4 border border-gray-200 rounded-xl"
                        placeholder="Role/Position"
                      />
                    </div>
                    <input
                      {...register(`experience.${index}.duration`)}
                      className="w-full p-4 border border-gray-200 rounded-xl"
                      placeholder="2020 - 2023"
                    />
                    <textarea
                      {...register(`experience.${index}.description`)}
                      rows={3}
                      className="w-full p-4 border border-gray-200 rounded-xl"
                      placeholder="What did you do there..."
                    />
                    <Button type="button" variant="outline" onClick={() => removeExperience(index)} className="w-full md:w-auto">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Experience
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendExperience({})} className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </section>

            <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-3xl text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 mx-auto max-w-md">
              <Eye className="w-6 h-6" />
              Preview & Publish
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio;

