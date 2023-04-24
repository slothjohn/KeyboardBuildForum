import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import PostPage from "./PostPage";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
      <Route path="/post/:postId" element={<PostPage />} />
  </Routes>
</BrowserRouter>

)
