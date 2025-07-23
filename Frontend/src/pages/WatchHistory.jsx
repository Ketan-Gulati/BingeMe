import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// Utility to format video duration
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function WatchHistory() {
  const [loading, setLoading] = useState(false);
  const [watchHist, setWatchHist] = useState([]);
  const [error, setError] = useState(null);

  // Get theme from Redux store
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/users/history', { withCredentials: true });
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

  if (loading) return <div className="p-4 sm:p-6"><Loading /></div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

  return (
    <div
      className={`p-4 sm:p-6 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-[#ffffff] text-black'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Watch History</h2>

      {watchHist?.length === 0 ? (
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No videos watched yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watchHist.map((video) => (
            <Link
              to={`/video/${video._id}`}
              key={video._id}
              className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:scale-[1.02] transition-transform ${
                theme === 'dark' ? 'bg-[#1f1f1f]' : 'bg-gray-100'
              }`}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-2">{video.title}</h3>
                <p
                  className={`text-sm mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  by {video.owner?.fullName || 'Unknown'}
                </p>
                <div
                  className={`flex items-center text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
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
