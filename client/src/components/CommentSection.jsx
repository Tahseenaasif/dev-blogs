import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Comment from './Comment';
import {
    Alert,
    Button,
    TextInput,
    Textarea,
} from "flowbite-react";
export default function CommentSection(postId) {
    const { currentuser } = useSelector((state) => state.user);
    const { commentError, setCommentError } = useState(null)
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const handleSubmit = async (e) => {
        console.log("this is postId ", postId)
        console.log("handleSubmit hits")
        e.preventDefault();
        if (comment.length > 200) {
            console.log("handleSubmit hits2")
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId: postId.postid,
                    userId: currentuser._id,
                }),
            });
            console.log("this is response", res)
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };
    useEffect(() => {

        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId.postid}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentuser ?
                (
                    <div className='flex items-center gap-1 my-5 text-grey-500'>
                        <p>Singed in as :</p>
                        <img className='h-5 w-5 object-cover rounded-full' src={currentuser.profilePicture} />
                        <Link className='text-xs text-cyan-600 hover:underline' to={'/dashboard?tab=profile'}>
                            @{currentuser.username}
                        </Link>
                    </div>
                )
                : (
                    <div className="text-sm text-teal-500 my-5 flex gap-1">
                        You Must be signed to comment
                        <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                            Sign In
                        </Link >
                    </div>
                )}
            {currentuser && (
                <form onSubmit={handleSubmit} className='border botder-teal-500 rounded-md p-3'>
                    <Textarea
                        placeholder='add a comment....'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div
                        className='flex justify-between items-center mt-5 '
                    ><p className='text-gray-500'>{200 - comment.length} Character remaining</p>
                    <Button outline gradientDuoTone='purpleToBlue'
                        type='submit'>
                        Submit
                    </Button>
                    
                    </div>
                    
                    {commentError &&
                        <Alert color='failure' className='mt-5' >
                            {commentError}
                        </Alert>
                    }
                </form>
            )}
            {comments.length == 0 ? (
                <p className='text-sm my-5'>
                    No Comments  yet!</p>
            ) :
                (
                    <>
                        <div className="text-sm my-5 flex items-center gap-1">
                            <p>Comments</p>
                            <div className="border  border-gray-400 py-1 px-2 rounded-sm  ">
                                <p>{comments.length} </p>
                            </div>
                        </div>
                        {comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} />
                        ))}

                    </>

                )}
        </div> 
    )
}
