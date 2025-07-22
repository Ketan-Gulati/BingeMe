import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import { FiMessageSquare, FiClock, FiTrash2 } from 'react-icons/fi';

function UserPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/v1/communityPost/user/${userId}`, { withCredentials: true });
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

  if (loading) return (
    <div className="flex justify-center p-8">
      <Loading />
    </div>
  );

  if (error) return (
    <div className="text-center p-6">
      <div className="inline-block px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium shadow-sm">
        {error.message || "Failed to load user's posts"}
      </div>
    </div>
  );

  const handleDelete = async(postId)=>{
    try {
        await axios.delete(`/v1/communityPost/${postId}`)
        setUserPosts(prev => prev.filter(p => p._id !== postId));     // to update the UI after immediately after deletion
    } catch (error) {
        console.error("Failed to delete post: ",error)
        alert("Failed to delete post!")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-500 mb-6">
        <FiMessageSquare />
        My Posts
      </h1>

      {userPosts?.length === 0 ? (
        <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-10 text-center shadow-md">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-[#3a3a3a] rounded-full flex items-center justify-center mb-4">
            <FiMessageSquare className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">No posts yet</h3>
          <p className="text-gray-500 mt-1">You haven’t shared anything with the community yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 shadow hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 relative"
            >
              {/* Delete Button */}
              <button
                onClick={()=>handleDelete(post._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
                title="Delete post"
              >
                <FiTrash2 size={18} />
              </button>

              <div className="flex items-start gap-4">
                <img
                  src={post.owner.avatar}
                  alt={post.owner.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {post.owner.fullName}
                    </span>
                    <span className="text-sm text-gray-500">@{post.owner.userName}</span>
                    <span className="flex items-center text-sm text-gray-400 gap-1">
                      <FiClock size={14} />
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-800 dark:text-gray-200">{post.content}</p>
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
