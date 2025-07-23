import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

function VideoCard({ id, thumbnail, title, duration, views, owner, createdAt, deleteBtn, onDelete }) {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Format created date like "2 days ago"
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

  // Format views like 1.2K, 3.5M
  const formatViews = (count) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count;
  };

  // Navigate to video detail page
  const handleClick = async () => {
    await axiosInstance.patch(`/videos/${id}`);
    navigate(`/video/${id}`);
  };

  // Handle delete video button
  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent navigation
    try {
      await axiosInstance.delete(`/videos/${id}`);
      if (onDelete) onDelete(id); // Callback to remove from UI
    } catch (error) {
      console.error("Error while deleting video: ", error);
    }
  };

  return (
    <div
  onClick={handleClick}
  className={clsx(
    'w-full sm:max-w-sm rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 cursor-pointer relative',
    theme === 'dark'
      ? 'bg-[#1f1f1f] shadow-gray-700'
      : 'bg-white shadow-gray-300 border border-gray-200'
  )}
>
  <div className="relative">
    <img
      src={thumbnail}
      alt={title}
      className="w-full aspect-video object-cover"
    />
    <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
      {formatDuration(duration)}
    </span>
  </div>

  <div className="p-3">
    <div className="flex gap-3 flex-start">
      {/* Owner Avatar */}
      {owner?.avatar && (
        <img
          src={owner.avatar}
          alt={owner.fullName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}

      {/* Video Details */}
      <div className="flex-1 min-w-0">
        <h3 className={clsx(
          'font-medium text-sm line-clamp-2 mb-1 min-h-[2.5rem]',
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        )}>
          {title}
        </h3>
        <div className={clsx('text-xs', theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
          {owner?.fullName && <p className="line-clamp-1">{owner.fullName}</p>}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <span>{formatViews(views)} views</span>
            <span>•</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Delete button (if shown) */}
  {deleteBtn && (
    <button
      onClick={handleDelete}
      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded z-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25
          2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456
          0a48.108 48.108 0 0 0-3.478-.397m-12
          .562c.34-.059.68-.114 1.022-.165m0
          0a48.11 48.11 0 0 1 3.478-.397m7.5
          0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
          51.964 0 0 0-3.32 0c-1.18.037-2.09
          1.022-2.09 2.201v.916m7.5 0a48.667
          48.667 0 0 0-7.5 0"
        />
      </svg>
    </button>
  )}
</div>

  );
}

export default VideoCard;
