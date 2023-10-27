import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  }) 
  
  const [err, setErr] = useState();
  
  const navigate = useNavigate();
  //using useState set set multiple inputs
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault() //prevent page reload
    try {
      await axios.post('/auth/register', inputs)
      navigate('/login');
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  }

  return (
    <div className='auth'>
      <img src={Logo} alt="logo" />
      <h1>Register</h1>
      <form action="">
        <input
          required
          type='text'
          placeholder='Username'
          onChange={handleChange}
          name='username'
        />
        <input
          required
          type='email'
          placeholder='Email'
          onChange={handleChange}
          name='email'
        />
        <input
          required
          type='password'
          placeholder='Password'
          onChange={handleChange}
          name='password'
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Already have an Account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register
