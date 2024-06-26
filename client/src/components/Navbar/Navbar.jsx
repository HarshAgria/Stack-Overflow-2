import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode';
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = ({darkMode, toggleDarkMode}) => {

    const dispatch = useDispatch()
    var User= useSelector((state) => (state.currentUserReducer))
    // console.log(User);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
        window.alert('Logged out!');
        navigate('/')
        dispatch(setCurrentUser(null))
    }


    useEffect(() => {
        const token =User?.token;
        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                alert('Session expired login again!!')
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))    
    },[User?.token,dispatch]);



    function stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str?.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }

    let backgroundColor = '#009dff'; // Default background color
    if (User !== null ) {
        backgroundColor = stringToColor(User?.result?.name);
    }
    // console.log(User.user.name);

  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt='logo' />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <Link to='/post' className='nav-item nav-btn'>PostContent</Link>
            <form>
                <input type="text" placeholder='Search...' />
                <img src={search} alt="search" width="18" className='search-icon'/>
            </form>

            <FontAwesomeIcon className='mode-icon' icon={darkMode ? faSun : faMoon } onClick={toggleDarkMode}  />

            {User === null ? 
                <Link to='/Auth' className='nav-item nav-links'>Log in</Link> :
                <>
                    <Avatar backgroundColor={backgroundColor} px="1rem" py=".7rem" borderRadius="50%" color="white" >
                    {
                    User!== null && (
                        <Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none',fontSize:'17px'}}>
                        {User?.result?.name.charAt(0).toUpperCase()}
                        </Link>
                    )}
                        </Avatar>
                    <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                </>
            }
        </div>
    </nav>
  )
}

export default Navbar
