import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const PrivateChannelProfile = () => {
  const { theme } = useSelector((state) => state.theme);

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState({
    userName: '',
    fullName: '',
    avatar: '',
    coverImage: '',
    totalSubscribers: 0,
    totalVideos: 0,
    totalViews: 0,
    totalLikes: 0,
  });

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const [profileRes, statsRes, videosRes] = await Promise.all([
          axiosInstance.get('/users/current-user'),
          axiosInstance.get('/dashboard/stats'),
          axiosInstance.get('/dashboard/videos?includeUnpublished=true'),
        ]);

        setChannelData({
          userName: profileRes.data.message.userName,
          fullName: profileRes.data.message.fullName,
          avatar: profileRes.data.message.avatar,
          coverImage: profileRes.data.message.coverImage || '../../public/joe-woods-4Zaq5xY5M_c-unsplash.jpg',
          totalSubscribers: statsRes.data.message.totalSubscribers,
          totalVideos: statsRes.data.message.totalVideos,
          totalViews: statsRes.data.message.totalViews,
          totalLikes: statsRes.data.message.totalLikes,
        });

        setVideos(videosRes.data.message.videos || []);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  const handleDelete = (videoId) => {
    setVideos(prev => prev.filter(video => video._id !== videoId));
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  };

  if (loading) return <Loading />;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-gray-900'}`}>
      {/* Cover Image */}
      <div className={`h-48 w-full overflow-hidden ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-200'}`}>
        <img
          src={channelData.coverImage}
          alt="Channel cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#121212] overflow-hidden">
            <img
              src={channelData.avatar}
              alt="Channel avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metadata */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{channelData.fullName}</h1>
            <p className="text-gray-600 dark:text-gray-300">@{channelData.userName}</p>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex flex-col">
                <span className="font-semibold">{formatNumber(channelData.totalSubscribers)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Subscribers</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{formatNumber(channelData.totalVideos)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Videos</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{formatNumber(channelData.totalViews)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Views</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{formatNumber(channelData.totalLikes)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="px-6 pb-12">
        <h2 className="text-xl font-bold mb-6">Your Videos</h2>
        {videos?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map(video => (
              <VideoCard
                key={video._id}
                id={video._id}
                thumbnail={video.thumbnail}
                title={video.title}
                duration={video.duration}
                views={video.views}
                owner={{ fullName: channelData.fullName, avatar: channelData.avatar }}
                createdAt={video.createdAt}
                deleteBtn={true}
                onDelete={() => handleDelete(video._id)}
              />
            ))}
          </div>
        ) : (
          <div className={`rounded-lg p-12 text-center border ${theme === 'dark' ? 'bg-[#1e1e1e] border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold">No videos uploaded yet</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Upload your first video to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateChannelProfile;
