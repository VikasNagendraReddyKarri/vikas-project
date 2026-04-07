import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', instructor: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/analytics', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnalytics(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/courses',
        newCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Course created successfully!');
      setNewCourse({ title: '', instructor: '' });
      setShowForm(false);
      fetchAnalytics();
    } catch (err) {
      alert('Error creating course: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {showForm ? 'Cancel' : '+ Add Course'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {showForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Create New Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Name</label>
                <input
                  type="text"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Course'}
              </button>
            </form>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-6 text-gray-800">Course Analytics</h2>
        
        {analytics.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">No analytics data available yet.</p>
            <p className="text-sm text-gray-400 mt-2">Add courses and collect feedback to see analytics.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.map((item, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">Instructor: {item.instructor || 'N/A'}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {item.avg_rating ? parseFloat(item.avg_rating).toFixed(1) : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{item.feedback_count || 0}</p>
                    <p className="text-sm text-gray-500">Total Feedback Responses</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
