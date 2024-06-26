import { Sidebar } from 'flowbite-react';
import React from 'react';
import { HiAnnotation, HiArrowRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, seTab] = useState('');
    const { currentuser } = useSelector((state) => state.user);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabformUrl = urlParams.get('tab');

        if (tabformUrl) {
            seTab(tabformUrl)
        }
    }, [location])

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup
                    className='flex flex-col gap-1'
                >
                    {currentuser.isAdmin == 'true' && (
                        <Link to={'/dashboard?tab=dash'}>
                            <Sidebar.Item
                              active={tab === 'dash' || !tab}
                                icon={HiChartPie}
                                labelColor="dark"
                                as='div'
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentuser.isAdmin ? "Admin" : "User"} labelColor="dark"
                            as='div'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentuser.isAdmin == 'true' && (
                        <Link to={'/dashboard?tab=posts'}>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                labelColor="dark"
                                as='div'
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentuser.isAdmin == 'true' && (
                        <Link to={'/dashboard?tab=users'}>
                            <Sidebar.Item
                                active={tab === 'users'}
                                icon={HiOutlineUserGroup}
                                labelColor="dark"
                                as='div'
                            >
                                Users
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentuser.isAdmin == 'true' && (
                        <Link to={'/dashboard?tab=comments'}>
                            <Sidebar.Item
                                active={tab === 'comments'}
                                icon={HiAnnotation}
                                labelColor="dark"
                                as='div'
                            >
                                Comments
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item onClick={handleSignout} icon={HiArrowRight} className="cursor-pointer">
                        Sign Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
