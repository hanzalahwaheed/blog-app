import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu.jsx'

const Single = () => {
  const [post, setPost] = useState({});
  const postID = useLocation().pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postID}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postID}`);
        // console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [postID]);

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="post" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="user" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username &&
            <div className="edit">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="edit-button" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="delete-button" />
            </div>}
        </div>
        <h1>{post.title}</h1>
        {post.desc}
      </div>
      <div className="menu">
        <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single