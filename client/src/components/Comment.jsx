import React, { useEffect, useState } from 'react'
import moment from 'moment';
export default function Comment(Comment) {
    console.log('this is comment',Comment);
    const [user, setUser] = useState({});
    useEffect(() => {
        console.log("use effcet hits")
        const getUser = async () => {
          try {
            const res = await fetch(`/api/user/${Comment.comment.userId}`);
            console.log("this is res",res)
            const data = await res.json();
            if (res.ok) {
                console.log("this is user data",data)
                setUser(data);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        getUser();
      }, [Comment]);
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
     <div className=' flex-shrink-0 mr-3'>
       <img className='w-10 h-10 rounded-full bg-gray-200 ' src={user.profilePicture} alt={user.username}/>
     </div>
     <div className='flex-1'>
        <div className='flex items-center mb-1'>
           <span className='font-bold mr-1 text-xs truncate '>{user ? `@${user.username}`:'anonymous'}</span>
           <span className='text-gray-500 text-xs '>
            {moment(Comment.comment.createdAt).fromNow()}
           </span>
        </div>
        <p className='text-gray-500 pb-2'>{Comment.comment.content}</p>
     </div>
    </div>
  )
}
