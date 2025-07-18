import React from 'react';

function VideoCard({ thumbnail, title, duration, views, createdAt }) {
  // Convert duration (seconds) to MM:SS format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Format date from ISO string to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  return (
    <div className="w-full max-w-xs bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Thumbnail with duration badge */}
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {formatDuration(duration)}
        </span>
      </div>

      {/* Video info */}
      <div className="p-3">
        <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
          {title}
        </h3>
        <div className="flex justify-between text-gray-400 text-xs">
          <span>{formatViews(views)} views</span>
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;