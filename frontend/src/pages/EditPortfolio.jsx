import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Trash2, Save, ArrowLeft, Loader2 } from 'lucide-react';
import ApiClient from '../utils/api';
import CreatePortfolio from './CreatePortfolio'; // Reuse form components/logic

const EditPortfolio = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const api = new ApiClient(token);

  const { data: portfolio, isLoading, error } = useQuery({
    queryKey: ['portfolio', username],
    queryFn: () => api.get(`/portfolio/${username}`),
    enabled: !!username && !!token,
  });

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm();

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

  React.useEffect(() => {
    if (portfolio) {
      reset(portfolio);
    }
  }, [portfolio, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/portfolio/${username}`, data);
      queryClient.invalidateQueries({ queryKey: ['portfolio', username] });
      navigate(`/${username}`);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Portfolio Not Found</h2>
          <Button onClick={() => navigate('/dashboard')} className="mt-6">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(`/${username}`)}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            View Live
          </Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4 text-center">
            Edit Portfolio - @{username}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Reuse CreatePortfolio structure - Personal Info */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input {...register('fullName')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input {...register('title')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20" />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea {...register('bio')} rows={4} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image URL</label>
                <input {...register('profileImage')} className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20" />
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input {...register('contact.email')} className="w-full p-4 border border-gray-200 rounded-2xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                  <input {...register('contact.linkedin')} className="w-full p-4 border border-gray-200 rounded-2xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub</label>
                  <input {...register('contact.github')} className="w-full p-4 border border-gray-200 rounded-2xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <input {...register('contact.website')} className="w-full p-4 border border-gray-200 rounded-2xl" />
                </div>
              </div>
            </section>

            {/* Skills - Dynamic */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
              <div className="space-y-3">
                {skillsFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-end">
                    <input
                      {...register(`skills.${index}`)}
                      className="flex-1 p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/20"
                    />
                    <Button type="button" variant="outline" onClick={() => removeSkill(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendSkill('')} className="w-full justify-start">
                  Add Skill
                </Button>
              </div>
            </section>

            {/* Projects - Dynamic */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
              <div className="space-y-4">
                {projectsFields.map((field, index) => (
                  <div key={field.id} className="border p-6 rounded-2xl bg-gray-50 space-y-4">
                    <input {...register(`projects.${index}.name`)} placeholder="Name" className="w-full p-4 border rounded-xl" />
                    <textarea {...register(`projects.${index}.description`)} rows={2} placeholder="Description" className="w-full p-4 border rounded-xl" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input {...register(`projects.${index}.githubLink`)} placeholder="GitHub" className="w-full p-4 border rounded-xl" />
                      <input {...register(`projects.${index}.liveDemo`)} placeholder="Live Demo" className="w-full p-4 border rounded-xl" />
                    </div>
                    <input {...register(`projects.${index}.techStack`)} placeholder="Tech Stack (comma separated)" className="w-full p-4 border rounded-xl" />
                    <Button type="button" variant="outline" onClick={() => removeProject(index)}>Remove Project</Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendProject({})} className="w-full">Add Project</Button>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
              <div className="space-y-4">
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="border p-6 rounded-2xl bg-gray-50 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input {...register(`experience.${index}.company`)} placeholder="Company" className="w-full p-4 border rounded-xl" />
                      <input {...register(`experience.${index}.role`)} placeholder="Role" className="w-full p-4 border rounded-xl" />
                    </div>
                    <input {...register(`experience.${index}.duration`)} placeholder="Duration" className="w-full p-4 border rounded-xl" />
                    <textarea {...register(`experience.${index}.description`)} rows={3} placeholder="Description" className="w-full p-4 border rounded-xl" />
                    <Button type="button" variant="outline" onClick={() => removeExperience(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendExperience({})} className="w-full">Add Experience</Button>
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4 pt-8 border-t">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 text-lg font-bold rounded-2xl shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate(`/${username}`)}
                className="flex-1 py-4 text-lg font-bold rounded-2xl"
              >
                View Live Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;

