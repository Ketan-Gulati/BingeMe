import React, { useEffect } from 'react';
import VideoCard from './VideoCard';
import ErrorBox from './ErrorBox';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showPopup } from '../Redux/slice/popupSlice';
import clsx from 'clsx';
import { fetchVideos } from '../Redux/slice/videoSlice';

function Home() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme.theme);
  
  const list = useSelector(state => state.videos?.list || []);
  const loading = useSelector(state => state.videos?.loading || false);
  const error = useSelector(state => state.videos?.error || null);

  useEffect(() => {
  console.log("Updated video list:", list); // ADD THIS
}, [list]);

  useEffect(() => {
    // Show popup if redirected from protected route
    if (location.state?.from && !isLoggedIn) {
      dispatch(showPopup());
    }

    // Initial video fetch
    dispatch(fetchVideos({}));
  }, [location, isLoggedIn, dispatch]);


  return (
    <div
      className={clsx(
        'p-5 min-h-screen',
        theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-white text-black'
      )}
    >
      {loading && <Loading isVideo={true} />}
      {error && <ErrorBox />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list?.map((video) => (
          <VideoCard
            key={video._id}
            id={video._id}
            thumbnail={video.thumbnail}
            title={video.title}
            duration={video.duration}
            views={video.views}
            owner={video.owner}
            createdAt={video.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
