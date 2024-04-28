import React from 'react'
import { useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile"
import DashPosts from '../components/DashPosts';
export default function Dashboard() {
  const location=useLocation();
  const [tab,seTab]=useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabformUrl=urlParams.get('tab');
   
    if(tabformUrl){
      seTab(tabformUrl)
    }
  },[location])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    <div className="">
      {/* sidebar */}
   <DashSidebar/>
    </div>
    {/* profile ..... */}
    <div>
    {tab ==='profile' && <DashProfile/>
      }
     {tab==='posts' && <DashPosts/>}
    </div>
   
    </div>
  )
}
