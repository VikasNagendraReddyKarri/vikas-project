import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/feedback',
        {
          course_id: selectedCourse,
          question_id: 1,
          rating: feedback.rating,
          comment: feedback.comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Feedback submitted successfully!');
      setSelectedCourse(null);
      setFeedback({ rating: 5, comment: '' });
    } catch (err) {
      alert('Error submitting feedback: ' + (err.response?.data?.error || err.message));
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
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Available Courses</h2>
        
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-2">Instructor: {course.instructor}</p>
                <button
                  onClick={() => setSelectedCourse(course.id)}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Give Feedback
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedCourse && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5 stars)
                </label>
                <select
                  value={feedback.rating}
                  onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} {'⭐'.repeat(num)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full h-24"
                  placeholder="Share your thoughts about the course..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
