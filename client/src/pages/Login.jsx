import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png'
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })
  // console.log(inputs);
  const [err, setErr] = useState();

  const navigate = useNavigate();
  //using useState set set multiple inputs

  
  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault() //prevent page reload
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setErr(err.response.data);
    }
  }
  return (
    <div className='auth'>
      <img src={Logo} alt="logo" />
      <h1>Login</h1>
      <form action="">
        <input type='text' placeholder='Username' name='username' onChange={handleChange} required />
        <input type='password' placeholder='Password' name='password' onChange={handleChange} required />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't have an Account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login
