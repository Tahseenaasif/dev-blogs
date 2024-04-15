import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'
export default function DashProfile() {
    const { currentuser } = useSelector((state) => state.user);
    return (
        <div className="'max-w-lg mx-auto p-3 w-full">
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className="flex flex-col gap-4 ">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full gap-4 ">
                    <img src={currentuser.profilePicture} alt="user" className='rounded-full  w-full h-full border-8 border-[lightgrey]'></img>
                </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentuser.username} />
                <TextInput type='text' id='useremailname' placeholder='email' defaultValue={currentuser.email} />
                <TextInput type='password' id='password' placeholder='password' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                 <span className='cursor-pointer'>Delete Account</span>
                 <span className='cursor-pointer'>Delete Account</span>
            </div>
        </div>
    )
}
