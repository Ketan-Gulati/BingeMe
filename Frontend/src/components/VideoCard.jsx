import React from 'react';
import { useNavigate } from 'react-router-dom';

function VideoCard({ id, thumbnail, title, duration, views, owner, createdAt }) {

  const navigate = useNavigate();

  // Convert duration (seconds) to MM:SS format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Format date from ISO string to "X time ago"
  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    
    return 'Just now';
  };

  // Format view count (e.g., 1000 -> 1K)
  const formatViews = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  const handleClick = ()=>{
    navigate(`/video/${id}`)
  }

  return (
    <div onClick={handleClick} className="w-full max-w-xs bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-md hover:shadow-gray-600 transition-shadow duration-300 cursor-pointer">
      {/* Thumbnail with duration badge */}
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/320x180';
          }}
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {formatDuration(duration)}
        </span>
      </div>

      {/* Video info */}
      <div className="p-3">
        <div className="flex gap-3">
          {/* Channel avatar */}
          {owner?.avatar && (
            <img 
              src={owner.avatar} 
              alt={owner.fullName} 
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/40';
              }}
            />
          )}
          
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
              {title}
            </h3>
            
            {/* Channel name and metadata */}
            <div className="text-gray-400 text-xs">
              {owner?.fullName && (
                <p className="line-clamp-1">{owner.fullName}</p>
              )}
              <div className="flex gap-2">
                <span>{formatViews(views)} views</span>
                <span>•</span>
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;