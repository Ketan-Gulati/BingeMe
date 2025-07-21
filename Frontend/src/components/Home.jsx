import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import ErrorBox from './ErrorBox';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import  {useDispatch, useSelector} from 'react-redux'
import { showPopup } from '../Redux/slice/popupSlice';

function Home() {
  const [videos, setVideos] = useState({ videos: [], currentPage: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    // Show popup only if redirected from protected route
    if (location.state?.from && !isLoggedIn) {
      dispatch(showPopup());
    }
  }, [location, isLoggedIn, dispatch]);

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
    <div className='p-5'>
      {/* created a separate loading component for better UI */}
      {loading && <Loading isVideo={true}/>}    
      {error && <ErrorBox/>}
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        {videos.videos?.map((video)=>(<VideoCard key={video._id} thumbnail={video.thumbnail} title={video.title} duration={video.duration} views={video.views} owner={video.owner} createdAt={video.createdAt}/>))}
      </div>
    </div>
  );
}

export default Home;