import React from 'react';

function Loading({ isVideo = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Always show spinner */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-1 rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin animation-delay-150"></div>
        </div>
        <p className="mt-3 text-gray-600 dark:text-gray-400 font-medium">Loading content...</p>
      </div>

      {/* Conditionally show video skeleton */}
      {isVideo && (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loading;