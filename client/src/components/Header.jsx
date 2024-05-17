import { Avatar, Dropdown, Navbar, TextInput, Textarea } from 'flowbite-react'
import { AiOutlineSearch } from "react-icons/ai"
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa'
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toggletheme } from '../redux/theme/themeSlice';

export default function Header() {
    const { currentuser } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log("this is current user", currentuser)
    const path = useLocation().pathname;
    const location = useLocation();
    const { theme } = useSelector((state) => state.theme)
    const [searchTerm, setSearchTerm] = useState('')
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
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }

    }, [location.search])
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        

    }
    return (
        <Navbar className='border-b-2'>
            <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" >Tahseen's </span>
                Blog
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput
                    value={searchTerm}
                    type='text'
                    placeholder='Search....'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2' pill>
                <Button onClick={() => dispatch(toggletheme())} className="w-12 h-10 hidden sm:inline" color='grey' pill>
                    {theme == 'light' ? <FaSun /> : <FaMoon />}

                </Button>
                {currentuser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentuser.
                                    profilePicture
                                }
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentuser.username}</span>
                            <span className='block text-sm font-medium truncate'>@{currentuser.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard?tab=profile'>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) :
                    (<Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>)
                }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
