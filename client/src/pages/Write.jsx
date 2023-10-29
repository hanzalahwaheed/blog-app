import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';


const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || '');
  const [value, setValue] = useState(state?.desc || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file)
      const res = await axios.post('/upload', formData)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
        })
        :
        await axios.post(`/posts/}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : '',
          date: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill
            className='editor'
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status : </b>Public
          </span>
          <span>
            <b>Visibility : </b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file" id="file"
            onChange={e => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className='file'>Upload Image</label>
          <div className="buttons">
            <button>Save as a Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="category">
            <input type="radio" checked={cat === "art"} name='category' value='art' id='art' onChange={e => setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="category">
            <input type="radio" checked={cat === "science"} name='category' value='science' id='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="category">
            <input type="radio" checked={cat === "technology"} name='category' value='technology' id='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="category">
            <input type="radio" checked={cat === "food"} name='category' value='food' id='food' onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div >

    </div >
  )
}

export default Write