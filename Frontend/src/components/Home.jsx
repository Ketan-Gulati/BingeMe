import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import ErrorBox from './ErrorBox';

function Home() {
  const [videos, setVideos] = useState({ videos: [], currentPage: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchVideos = async()=>{
      setLoading(true);
      try {
        const res = await axios.get('/v1/videos/')
        setVideos({
          videos: res.data.message?.videos || [], 
          currentPage: res.data.message?.currentPage || null
        });
      } catch (error) {
        setError(error);
        console.error("Error fetching videos:", error);
      }finally {
        setLoading(false);
      }
    }
    fetchVideos();
  },[]);

  return (
    <div className='px-5'>
      {loading && <p className="text-white">Loading...</p>}
      {error && <ErrorBox/>}
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        {videos.videos?.map((video)=>(<VideoCard key={video._id} thumbnail={video.thumbnail} title={video.title} duration={video.duration} views={video.views} createdAt={video.createdAt}/>))}
      </div>
    </div>
  );
}

export default Home;