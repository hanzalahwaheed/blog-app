import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const currentPostId = parseInt(parts[parts.length - 1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
      <h1>Other posts you might like...</h1>
    
      {posts.map(post => (
        (currentPostId !== post.id) && (
          <div className="post" key={post.id}>
            <img src={post.img} alt="post-img" />
            <h3>{post.title}</h3>
            <Link to={`/post/${post.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        )
      ))}
    </div >
  )
}

export default Menu