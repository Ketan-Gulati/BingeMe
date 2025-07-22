import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { FiMessageSquare, FiUser, FiClock, FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CommunityPosts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const [newPostContent, setNewPostContent] = useState('');
  const [creating, setCreating] = useState(false);

  const userId = useSelector(state => state.auth.user?._id);
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/v1/communityPost/', { withCredentials: true });
        setPosts(res.data.message.posts);
      } catch (error) {
        console.error("Failed to fetch posts: ", error);
        setError("Failed to load community posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Format timestamp
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setCreating(true);
    try {
      const res = await axios.post(
        '/v1/communityPost/createPost',
        { content: newPostContent },
        { withCredentials: true }
      );
      const newPost = res.data.message;
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    } finally {
      setCreating(false);
    }
  };

  const handleClick = () => {
    navigate(`/community-posts/${userId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-500">
          <FiMessageSquare />
          Community Posts
        </h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          onClick={handleClick}
        >
          <FiUser />
          My Posts
        </button>
      </div>

      {/* Create Post Form */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white dark:bg-[#1f1f1f] p-5 rounded-xl shadow mb-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-start gap-3">
          <FiEdit3 className="text-xl mt-1 text-blue-600" />
          <textarea
            rows={3}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#121212] dark:text-white"
            required
          />
        </div>
        <div className="mt-4 text-right">
          <button
            type="submit"
            disabled={creating || !newPostContent.trim()}
            className={`px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition ${
              creating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {creating ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {/* Loading & Error */}
      {loading ? (
        <div className="flex justify-center p-8">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-center p-6">
          <div className="inline-block px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium shadow-sm">
            {error}
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl p-10 text-center shadow-md">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-[#3a3a3a] rounded-full flex items-center justify-center mb-4">
            <FiMessageSquare className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">No posts yet</h3>
          <p className="text-gray-500 mt-1">Be the first to share something with the community</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div
              key={post._id}
              className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 shadow hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
            >
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

export default CommunityPosts;
