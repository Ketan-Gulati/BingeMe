import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';

const PublicChannelProfile = () => {
  const { userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState({
    userName: '',
    fullName: '',
    avatar: '',
    coverImage: '',
    subscribersCount: 0,
    isSubscribed: false,
    videos: []
  });

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/c/${userName}`);
        const { data } = response.data.message;
        
        setChannelData({
          userName: data.userName,
          fullName: data.fullName,
          avatar: data.avatar,
          coverImage: data.coverImage || '../../public/joe-woods-4Zaq5xY5M_c-unsplash.jpg',
          subscribersCount: data.subscribersCount,
          isSubscribed: data.isSubscribed,
          videos: data.videos || []
        });
      } catch (error) {
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [userName]);

  const handleSubscription = async () => {
    try {
      const response = await axiosInstance.post(`/subscriptions/c/${channelData._id}`);
      setChannelData(prev => ({
        ...prev,
        isSubscribed: !prev.isSubscribed,
        subscribersCount: prev.isSubscribed 
          ? prev.subscribersCount - 1 
          : prev.subscribersCount + 1
      }));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Cover Image */}
      <div className="h-48 w-full bg-gray-800 overflow-hidden">
        <img 
          src={channelData.coverImage} 
          alt="Channel cover" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1200x300";
          }}
        />
      </div>

      {/* Channel Info */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden">
            <img 
              src={channelData.avatar} 
              alt="Channel avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>

          {/* Channel Metadata */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{channelData.fullName}</h1>
            <p className="text-gray-400">@{channelData.userName}</p>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex flex-col">
                <span className="font-semibold">{formatNumber(channelData.subscribersCount)}</span>
                <span className="text-gray-400 text-sm">Subscribers</span>
              </div>
              
              <button
                onClick={handleSubscription}
                className={`px-4 py-2 rounded-full font-medium ${
                  channelData.isSubscribed
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-red-600 hover:bg-red-700'
                } transition-colors`}
              >
                {channelData.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="px-6 pb-12">
        <h2 className="text-xl font-bold mb-6">Videos</h2>
        {channelData.videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {channelData.videos.map(video => (
              <VideoCard
                key={video._id}
                video={video}
                owner={{
                  fullName: channelData.fullName,
                  avatar: channelData.avatar
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-white">No videos uploaded yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicChannelProfile;