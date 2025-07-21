import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

function Video() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/v1/videos/${videoId}`);
        setVideo(res.data.message);
      } catch (error) {
        console.error("Failed to load video", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/v1/comments/${videoId}`);
      setComments(res.data.message.comments);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      await axios.post(`/v1/comments/${videoId}`, { content: newComment });
      setNewComment("");
      await fetchComments();
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  if (!video) return <div className="min-h-screen flex items-center justify-center text-white">Video not found</div>;

  return (
    <div className="p-4 md:p-6 text-white bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* VIDEO PLAYER - FIXED */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
          <video
            controls
            className="absolute inset-0 w-full h-full object-contain"
            src={video.videoFile}
            poster={video.thumbnail}
          />
        </div>

        {/* VIDEO INFO */}
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold">{video.title}</h1>
          <p className="text-gray-400 mt-2">{video.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* OWNER INFO */}
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={video.owner?.avatar} 
            className="w-10 h-10 rounded-full object-cover" 
            alt="Owner avatar" 
          />
          <div>
            <div className="font-semibold">{video.owner?.fullName}</div>
            <div className="text-sm text-gray-500">@{video.owner?.userName}</div>
          </div>
        </div>

        {/* COMMENTS SECTION - FIXED */}
        <div className="border-t border-gray-700 pt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Comments ({comments.length})</h2>

          {/* COMMENT FORM */}
          <form onSubmit={handleCommentSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={commentLoading}
            />
            <button
              type="submit"
              disabled={commentLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
            >
              {commentLoading ? "Posting..." : "Post"}
            </button>
          </form>

          {/* COMMENT LIST */}
          <div className="space-y-6">
            {comments?.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="flex gap-4">
                  <img 
                    src={c.owner?.avatar} 
                    className="w-10 h-10 rounded-full object-cover" 
                    alt="avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/40';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{c.owner?.fullName}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-200">{c.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-white">No comments yet</h3>
                <p className="mt-1 text-gray-400">Be the first to comment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;