import axios from 'axios';
import React, { useId, useState } from 'react';

function UploadVideo() {
  const id = useId();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!title || !description || !video) {
      alert("Please fill in all required fields");
      return;      // to stop further execution
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const res = await axios.post('/v1/videos/', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Video uploaded successfully!");
      // Reset form after successful upload
      setTitle("");
      setDescription("");
      setVideo(null);
      setThumbnail(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Video</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor={`${id}-tit`} className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id={`${id}-tit`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={100}
            minLength={10}
            required
          />
          <p className="mt-1 text-sm text-gray-500">{title.length}/100 characters</p>
        </div>

        <div>
          <label htmlFor={`${id}-desc`} className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`${id}-desc`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor={`${id}-vid`} className="block text-sm font-medium text-gray-700 mb-1">
            Video File <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-md cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-sm text-gray-500">
                  {video ? video.name : "Click to select video (MP4, WebM, etc.)"}
                </p>
              </div>
              <input
                id={`${id}-vid`}
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-thumb`} className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail (Optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-md cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p className="text-sm text-gray-500">
                  {thumbnail ? thumbnail.name : "Click to select thumbnail (JPG, PNG, etc.)"}
                </p>
              </div>
              <input
                id={`${id}-thumb`}
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Upload Video'
          )}
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;