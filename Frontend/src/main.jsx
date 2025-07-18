import { StrictMode } from 'react'
import {Provider} from "react-redux"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Register from './pages/Register.jsx'
import Popup from './components/Popup.jsx'
import MyChannel from './pages/MyChannel.jsx'
import WatchHistory from './pages/WatchHistory.jsx'
import CommunityPosts from './pages/CommunityPosts.jsx'
import MyComments from './pages/MyComments.jsx'
import Playlists from './pages/Playlists.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UploadVideo from './pages/UploadVideo.jsx'
import Settings from './pages/Settings.jsx'
import Layout from './layouts/Layout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
      path: "/Home",
      element: <Home/>
      },
      {
        path: '/my-channel',
        element: <MyChannel/>
      },
      {
        path: '/watch-history',
        element: <WatchHistory/>
      },
      {
        path: '/community-posts',
        element: <CommunityPosts/>
      },
      {
        path: '/my-comments',
        element: <MyComments/>
      },
      {
        path: '/playlists',
        element: <Playlists/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/upload-video',
        element: <UploadVideo/>
      },
      {
        path: '/settings',
        element: <Settings/>
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

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
    <RouterProvider router={router}/>
  </Provider>,
)
