import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import { FiMessageSquare, FiClock, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function UserPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const { userId } = useParams();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/communityPost/user/${userId}`, { withCredentials: true });
        setUserPosts(res.data.message);
      } catch (error) {
        console.error("Failed to fetch user's posts: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getUserPosts();
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/communityPost/${postId}`);
      setUserPosts(prev => prev.filter(p => p._id !== postId));
    } catch (error) {
      console.error("Failed to delete post: ", error);
      alert("Failed to delete post!");
    }
  };

  if (loading) return (
    <div className="flex justify-center p-8">
      <Loading />
    </div>
  );

  if (error) return (
    <div className="text-center p-6">
      <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
        isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
      }`}>
        {error.message || "Failed to load user's posts"}
      </div>
    </div>
  );

  return (
    <div className={`max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 transition-colors duration-200 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-500 mb-6">
        <FiMessageSquare />
        My Posts
      </h1>

      {userPosts?.length === 0 ? (
        <div className={`rounded-xl p-10 text-center shadow-md ${
          isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'
        }`}>
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDark ? 'bg-[#3a3a3a]' : 'bg-gray-200'
          }`}>
            <FiMessageSquare className="text-gray-400 text-2xl" />
          </div>
          <h3 className={`text-lg font-semibold ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>No posts yet</h3>
          <p className={`mt-1 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>You haven’t shared anything with the community yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className={`rounded-2xl p-6 shadow hover:shadow-lg transition-shadow border relative ${
                isDark ? 'bg-[#1f1f1f] border-gray-700' : 'bg-white border-gray-100'
              }`}
            >
              <button
                onClick={() => handleDelete(post._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
                title="Delete post"
              >
                <FiTrash2 size={18} />
              </button>

              <div className="flex items-start gap-4">
                <img
                  src={post.owner.avatar}
                  alt={post.owner.fullName}
                  className={`w-12 h-12 rounded-full object-cover border-2 shadow ${
                    isDark ? 'border-gray-700' : 'border-white'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-semibold ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {post.owner.fullName}
                    </span>
                    <span className={`text-sm ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>@{post.owner.userName}</span>
                    <span className={`flex items-center text-sm gap-1 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <FiClock size={14} />
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <p className={`mt-2 ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPosts;
