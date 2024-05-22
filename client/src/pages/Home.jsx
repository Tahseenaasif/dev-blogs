import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState, useRef } from 'react';
import PostCard from '../components/PostCard';
import Typewriter from "typewriter-effect";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const typewriterRef = useRef(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  if (typewriterRef.current) {
    new Typewriter(typewriterRef.current, {
      strings: ['Hello World!'],
      autoStart: true,
      pauseFor: 10,
      deleteAll: true,
      loop: true,
      onCreateTextNode: (character) => {
        return character;
      },
    });
  }
  const handleDone = () => {

  }
  const handleType = () => {

  }
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <span className='text-3xl font-bold lg:text-2xl' >
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('Welcome To  Dev-Blogs')
              .pauseFor(1000)
              .deleteAll()
              .start();
          }}
        />
        </span>
        <div ref={typewriterRef}></div>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}