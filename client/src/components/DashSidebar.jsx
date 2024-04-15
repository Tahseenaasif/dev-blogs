import { Sidebar } from 'flowbite-react';
import React from 'react';
import { HiArrowRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'
export default function DashSidebar() {
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
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active={tab==='profile'} icon={HiUser} label="User" labelColor="dark">
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item  icon={HiArrowRight} className="cursor-pointer">
                        Sign Out
                    </Sidebar.Item>
                    
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
