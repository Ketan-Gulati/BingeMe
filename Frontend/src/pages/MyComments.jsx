import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

function MyComments() {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get('/comments/get-comments');
        setComments(res.data.message.comments);
      } catch (error) {
        console.error("Failed to fetch comments: ", error);
        setError("Failed to load comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen px-4 text-center font-medium ${
        isDark ? 'text-red-300' : 'text-red-600'
      }`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-6 sm:px-6 md:px-8 transition-colors duration-200 ${
      isDark ? 'text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">My Comments</h1>

        {comments?.length === 0 ? (
          <div className={`rounded-lg px-6 py-8 text-center shadow ${
            isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'
          }`}>
            <h3 className={`text-lg sm:text-xl font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>No comments yet</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your comments will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className={`rounded-lg px-4 py-5 sm:p-6 transition-colors shadow ${
                  isDark
                    ? 'bg-[#2a2a2a] hover:bg-[#333333]'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <img
                    src={comment.owner?.avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`font-semibold ${
                        isDark ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        @{comment.owner?.userName}
                      </span>
                      <span className={`text-sm ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className={`mb-4 ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {comment.content}
                    </p>

                    <Link
                      to={`/video/${comment.video._id}`}
                      className={`inline-flex items-center font-medium ${
                        isDark
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View Video
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComments;
