import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="logo" /></Link>
        </div>
        <div className="links">
          <Link className='link' to='/?cat=art'>
            <p>Art</p>
          </Link>
          <Link className='link' to='/?cat=science'>
            <p>Science</p>
          </Link>
          <Link className='link' to='/?cat=technology'>
            <p>Technology</p>
          </Link>
          <Link className='link' to='/?cat=design'>
            <p>Design</p>
          </Link>
          <Link className='link' to='/?cat=food'>
            <p>Food</p>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <span><Link to='/login'>Login</Link></span>}
          <span className='write'>
            <Link className='link' to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar