import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignIn from './pages/SignIn'; 
import Header from './components/Header';
import Search from './pages/Search'
import Footer from './components/footer'
import PrivateRoute from './components/privateRoute'
import CreatePost from './pages/CreatePost';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import UpdatePost from './pages/UpdatePost';
import Posts from "./pages/PostPage"
import ScrollToTop from "./components/ScrollToTop"
export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} /> 
        <Route path="/sign-up" element={<SignUp />} /> 
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<Posts />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
