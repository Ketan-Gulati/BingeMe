import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function WatchHistory() {
  const [loading, setLoading] = useState(false);
  const [watchHist, setWatchHist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/v1/users/history', { withCredentials: true });
        setWatchHist(res.data.message);
      } catch (err) {
        console.error("Error fetching watch history: ", err);
        setError('Failed to fetch watch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="p-6"><Loading /></div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold mb-6">Watch History</h2>
      {watchHist?.length === 0 ? (
        <p className="text-gray-400">No videos watched yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watchHist.map(video => (
            <Link
              to={`/video/${video._id}`}
              key={video._id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-70 text-white px-2 py-1 rounded-md">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-400 mb-1">by {video.owner?.fullName || 'Unknown'}</p>
                <div className="flex items-center text-gray-400 text-sm">
                  <FaEye className="w-4 h-4 mr-1" />
                  <span>{video.views} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchHistory;
