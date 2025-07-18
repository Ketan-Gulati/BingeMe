import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

function Popup({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup card */}
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in">
        {/* Close button (top-right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <IoClose className="text-gray-500 dark:text-gray-300 text-2xl" />
        </button>
        
        {/* Popup content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
              <svg 
                className="h-6 w-6 text-blue-600 dark:text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Sign In Required
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please sign in to access this feature
            </p>
          </div>
          
          {/* Single sign-in button */}
          <Link
            to="/sign-in"
            className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-colors"
            onClick={onClose}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Popup;