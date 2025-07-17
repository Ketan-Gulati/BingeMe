import { StrictMode } from 'react'
import {Provider} from "react-redux"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Layout from './layouts/layout.jsx'
import Register from './pages/Register.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
        {
      path: "",
      element:  <Home/>
      },
    ]
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
    <RouterProvider router={router}/>
  </Provider>,
)
