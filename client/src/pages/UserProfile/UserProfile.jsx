import React, { useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx'
import Avatar from '../../components/Avatar/Avatar.jsx'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBirthdayCake, faPen} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import EditProfileForm from './EditProfileForm.jsx'
import ProfileBio from './ProfileBio.jsx'
// import axios from 'axios';
// import { updateProfile } from '../../actions/users';
// import { useDispatch } from 'react-redux'

import './UsersProfile.css'

const UserProfile = () => {

    const { id }= useParams();
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)

    const [Switch, setSwitch] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');


  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
            <section>
                <div className='user-details-container'>
                    <div className='user-details'>

                        <>
                            {
                                // Switch ? <div onClick={handleImageUpload}>
                                //         <Avatar  backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px' cursor="pointer" backgroundImage={profilePicture} >
                                //     <FontAwesomeIcon icon={faPen}/>
                                // </Avatar>
                                //     </div>
                                // :
                                <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px' backgroundImage={uploadedImageUrl } >
                                    {currentProfile?.name.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                        </>

                        
                        <div className='user-name'>
                            <h1>{currentProfile?.name}</h1>
                            <p><FontAwesomeIcon icon={faBirthdayCake}/>  Joined  {moment(currentProfile?.joinedOn).fromNow()}</p>
                        </div>
                    </div>
                    {
                        currentUser?.result._id === id && (
                            <button type='button' className='edit-profile-btn' onClick={()=> setSwitch(true)}>
                                <FontAwesomeIcon icon={faPen}/> Edit Profile
                            </button>
                        )
                    }
                </div>
                <>
                    {
                        Switch ? (
                            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} setUploadedImageUrl={setUploadedImageUrl} />
                        ) : (
                            <ProfileBio currentProfile={currentProfile}/>
                        )
                    }
                </>
            </section>

        </div>
    </div>
  )
}

export default UserProfile;