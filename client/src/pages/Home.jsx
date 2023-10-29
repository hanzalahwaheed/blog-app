import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [cat]);

  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`./upload/${post.img}`} alt="post-img" />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Read More</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home