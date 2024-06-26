import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile, updateProfilepic } from '../../actions/users';
// import { response } from 'express';

const EditProfileForm = ({ currentUser, setSwitch, setUploadedImageUrl }) => {

    const [name, setName] = useState(currentUser?.result?.name);
    const [about, setAbout] = useState(currentUser?.result?.about);
    const [tags, setTags] = useState('');
    // const [profilePicture, setProfilePicture] = useState(currentUser?.result?.profilePicture);
    const dispatch = useDispatch();
    
    const selectImage = async () => {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', () => {
          const file = input.files[0];
          if (file) {
            resolve(file);
          } else {
            reject(new Error('No file selected'));
          }
        });
        input.click();
      });
    };

    const handleImageUpload = async (e) => {
      try {
          e.preventDefault();
          const file = await selectImage(); // Implement selectImage function to open file picker
          const formData = new FormData();
          formData.append('image', file);
          console.log(file);
          console.log(formData);

          dispatch(updateProfilepic(currentUser?.result?._id, formData));

          // const response = await axios.post(`/user/update/${currentUser?.result?._id}`, formData); // Upload image to server
          // console.log(response);
          // const imageUrl = response.data.imageUrl; // Assuming server responds with image URL
          // setProfilePicture(URL.createObjectURL(file));
          setUploadedImageUrl(response.data.profilePicture);
          // You can store imageUrl in your state or database as required
      } catch (error) {
          console.error('Error uploading image:', error);
      }

  };

    const handleSubmit = (e) => {
      e.preventDefault();
      if(tags[0] === "" || tags.length === 0){
        // dispatch(updateProfile( currentUser?.result._id, { name, about, tags: currentUser?.result?.tags }))
        alert("Update tags field");
        return;
      }else{
        dispatch(updateProfile(currentUser?.result?._id, {name, about, tags }))
        // dispatch(updateProfile(currentUser?.result?._id, formData));
      }
      // console.log({name, about, tags });
      setSwitch(false);

    }

  return (
    <div>
      <label htmlFor='profilePicture'>
                    <h3>Profile Picture</h3>
                    <input type='file' id='profilePicture' onChange={handleImageUpload} accept='image/*' />
                    {/* <input type='file' id='profilePicture' onChange={(e) => setProfilePicture(e.target.files[0])} /> */}
                    {/* {profilePicture && <img src={profilePicture} width='100px' height='100px' alt='Profile' />} */}
                </label>
      <h1 className='edit-profile-title'>
        Edit Your Profile
      </h1>
      <h2 className='edit-profile-title-2'>
        Public information
      </h2>
      <form className='edit-profile-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>
            <h3>Display name</h3>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label htmlFor='about'>
            <h3>About me</h3>
            <textarea id='about' cols='30'  rows='10' value={about} onChange={(e) => setAbout(e.target.value)}/>
        </label>
        <label htmlFor='tags'>
            <h3>Watched tags</h3>
            <p>Add tags separated by 1 space</p>
            <input type='text' id='tags' onChange={(e) => setTags(e.target.value.split(' '))}/>
        </label><br/>
        <input type='submit' value='Save profile' className='user-submit-btn'/>
        <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfileForm
