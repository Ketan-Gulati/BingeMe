import React from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Register from './pages/Register.jsx'
import WatchHistory from './pages/WatchHistory.jsx'
import CommunityPosts from './pages/CommunityPosts.jsx'
import MyComments from './pages/MyComments.jsx'
import Playlists from './pages/Playlists.jsx'
import UploadVideo from './pages/UploadVideo.jsx'
import Settings from './pages/Settings.jsx'
import Layout from './layouts/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AuthInitializer from './components/AuthInitializer.jsx';
import PrivateChannelProfile from './pages/PrivateChannelProfile.jsx';
import Video from './components/Video.jsx';
import UserPosts from './pages/UserPosts.jsx';

function App() {

  const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthInitializer>
        <Layout/>
      </AuthInitializer>
    ),
    children: [
      {
      path: "/",
      element: <Home/>
      },
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: '/my-channel',
        element: (
          <ProtectedRoute>
            <PrivateChannelProfile/>
          </ProtectedRoute>
        )
      },
      {
        path: '/watch-history',
        element: (
          <ProtectedRoute>
            <WatchHistory/>
          </ProtectedRoute>
        )
      },
      {
        path: '/community-posts',
        element: (
          <ProtectedRoute>
            <CommunityPosts/>
          </ProtectedRoute>
        )
      },
      {
        path: '/my-comments',
        element: (
          <ProtectedRoute>
            <MyComments/>
          </ProtectedRoute>
        )
      },
      {
        path: '/playlists',
        element: (
          <ProtectedRoute>
            <Playlists/>
          </ProtectedRoute>
        )
      },
      {
        path: '/upload-video',
        element: (
          <ProtectedRoute>
            <UploadVideo/>
          </ProtectedRoute>
        )
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings/>
          </ProtectedRoute>
        )
      },
      {
        path: 'video/:videoId',
        element: <Video/>
      },
      {
        path: '/community-posts/:userId',
        element: <UserPosts/>
      }
    ]
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  },
  {
    path: "/register",
    element: <Register/>
  },
])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App


