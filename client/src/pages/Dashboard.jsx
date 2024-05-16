import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile"
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DasboardComponent from '../components/DasboardComponent'
export default function Dashboard() {
  const location = useLocation();
  const [tab, seTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabformUrl = urlParams.get('tab');

    if (tabformUrl) {
      seTab(tabformUrl)
    }
  }, [location])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profile ..... */}
      <div>
        {tab === 'profile' && <DashProfile />
        }
        {tab === 'posts' && <DashPosts />}
        {tab==='users' && <DashUsers/>}
        {tab=='comments' && <DashComments/>}
        {tab=='dash' && <DasboardComponent/>}
      </div>

    </div>
  )
}
