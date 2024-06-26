import React from 'react'

import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import MapLocation from '../MapLocation/MapLocation.jsx'

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <nav className='side-bar'>
        <NavLink to='/' className= 'side-nav-links' activeClassName = 'active' 
          style={{marginTop:'70px'}} >
          <p>Home</p>
        </NavLink>
        <div className='side-nav-div'>
          <div><p>PUBLIC</p></div>
          <NavLink to='/Questions' className='side-nav-links' activeClassName ='active'>


            <img src={Globe} alt="Globe" className='globe-logo'/>
            {/* <FontAwesomeIcon icon={faGlobe} className='dark-globe-icon'/> */}


            <p  style={{paddingLeft:'10px'}}>Questions</p>
          </NavLink>
          <NavLink to='/Tags' className='side-nav-links' activeClassName ='active' style={{paddingLeft:'40px'}}>
            <p>Tags</p>
          </NavLink>
          <NavLink to='/Users' className='side-nav-links' activeClassName ='active' style={{paddingLeft:'40px'}}>
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
      <div>
        <MapLocation/>

      </div>
      
    </div>
  )
}

export default LeftSidebar
