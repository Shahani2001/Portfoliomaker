import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Plus, FileText, Briefcase, Star, Settings, Edit3, Save, X, Edit, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ApiClient from '../utils/api';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const queryClient = useQueryClient();

  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', user?.username],
    queryFn: async () => {
      const api = new ApiClient(token);
      return api.get(`/portfolio/${user.username}`);
    },
    enabled: !!user?.username,
  });

  const [editing, setEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ bio: portfolio?.bio || '', skills: portfolio?.skills || '' });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleShow = () => {
    window.location.href = `/${user?.username}`;
  };

  const handleSave = async () => {
    try {
      const api = new ApiClient();
      await api.put(`/portfolio/${user.username}`, editForm);
      queryClient.invalidateQueries({ queryKey: ['portfolio', user?.username] });
      setEditing(false);
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm({ bio: portfolio?.bio || '', skills: portfolio?.skills || '' });
  };

  React.useEffect(() => {
    setEditForm({ bio: portfolio?.bio || '', skills: portfolio?.skills || '' });
  }, [portfolio]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your portfolio, {user?.fullName}
          </p>
        </div>
        <div className="flex gap-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-200 text-gray-900 font-semibold rounded-2xl hover:bg-gray-50 transition-all"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <Link to={`/edit/${user?.username}`}>
                <Button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-2xl hover:bg-orange-700 transition-all flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Full Edit
                </Button>
              </Link>
              <button
                onClick={handleShow}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                My Profile
              </button>
              <button
                onClick={handleShow}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                Show Data
              </button>
            </>
          )}
          <button
            onClick={logout}
            className="px-6 py-3 border border-gray-200 text-gray-900 font-semibold rounded-2xl hover:bg-gray-50 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 2 Big Buttons Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className={`p-12 rounded-3xl shadow-2xl transition-all ${editing ? 'bg-gradient-to-br from-orange-400 to-red-500 cursor-not-allowed' : 'bg-gradient-to-br from-orange-500 to-red-600 hover:shadow-3xl hover:-translate-y-2 cursor-pointer bg-white/20'}`} onClick={!editing ? handleEdit : undefined}>
          <Edit3 className="w-24 h-24 mx-auto mb-8 text-white opacity-90" />
          <h2 className="text-4xl font-black text-white mb-4 text-center">Edit Portfolio</h2>
          <p className="text-white/90 text-lg text-center">Update your bio, skills and projects using full CRUD operations</p>
        </div>
        <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl hover:shadow-3xl hover:-translate-y-2 cursor-pointer bg-white/20" onClick={handleShow}>
          <Users className="w-24 h-24 mx-auto mb-8 text-white" />
          <h2 className="text-4xl font-black text-white mb-4 text-center">My Profile</h2>
          <p className="text-white/90 text-lg text-center">View your complete portfolio with all DB details</p>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Edit Portfolio</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                  placeholder="Tell your story..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                <input
                  value={editForm.skills}
                  onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="React, Node.js, JavaScript, ..."
                />
              </div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5 inline mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 rounded-3xl bg-white/70 border border-gray-200/50 shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Projects</p>
          <p className="text-3xl font-black text-gray-900">{portfolio?.projects?.length || 0}</p>
        </div>
        <div className="p-8 rounded-3xl bg-white/70 border border-gray-200/50 shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Experience</p>
          <p className="text-3xl font-black text-gray-900">{portfolio?.experience?.length || 0}</p>
        </div>
        <div className="p-8 rounded-3xl bg-white/70 border border-gray-200/50 shadow-xl">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Live Profile</p>
          <p className="text-3xl font-black text-gray-900">{user?.username ? `@${user.username}` : 'Setup'}</p>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 border-2 border-emerald-200/50 shadow-xl">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">Current Bio</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{portfolio?.bio || 'No bio set. Edit to add!'}</p>
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 border-2 border-indigo-200/50 shadow-xl">
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">Skills Preview</h3>
          <div className="flex flex-wrap gap-2">
            {editForm.skills.split(',').map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full font-medium">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

