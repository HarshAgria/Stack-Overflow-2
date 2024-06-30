import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile, updateProfilepic } from '../../actions/users';

const EditProfileForm = ({ currentUser, setSwitch }) => {

    const [name, setName] = useState(currentUser?.result?.name);
    const [about, setAbout] = useState(currentUser?.result?.about);
    const [tags, setTags] = useState('');
    const [profilepic,setprofilepic] = useState({ profilepic : ""});
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if(tags[0] === "" || tags.length === 0){
        alert("Update tags field");
        return;
      }else{
        dispatch(updateProfile(currentUser?.result?._id, {name, about, tags }))
      }
      // console.log({name, about, tags });
      setSwitch(false);

    }

    function convertToBase64(file){
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () =>{
          resolve(fileReader.result)
        };
        fileReader.onerror = (error) =>{
          reject(error)
        }
      })
    }


    const handleS = async(e) =>{
      e.preventDefault();
      // const filename = `${Date.now()}-${currentUser?.result?._id}.jpg`;
      // console.log(filename);
      // const imageData = { image: profilepic, filename };
      const imageData = { profilepic: profilepic };
      // console.log(imageData);
      try {
        dispatch(updateProfilepic(currentUser?.result?._id, imageData));
        // setSwitch(false);
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
    const handleFileUpload = async(e) =>{
      const file = e.target.files[0];
      console.log(file);
      const base64 = await convertToBase64(file);
      console.log("uploaded");
      setprofilepic(base64)
    }

 

  return (
    <div>
      <form onSubmit={handleS}>
        <h3>Profile Picture</h3>
      <label htmlFor='profilePicture' className='x'>
          <img src={profilepic || null } alt="" className='x' />
      </label>
                    <input type='file'
                     id='profilePicture' 
                     label='Image'
                     accept='.jpg,.png,.jpeg'
                     onChange={handleFileUpload}/>
                    <button type='submit'>Submit</button>
        
      </form>
      
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

export default EditProfileForm;
