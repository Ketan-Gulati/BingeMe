import { StrictMode } from 'react'
import {Provider} from "react-redux"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home.jsx'
import SignIn from './pages/SignIn.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Home/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
