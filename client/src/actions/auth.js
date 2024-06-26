import * as api from '../api';
import { setCurrentUser } from './currentUser';
import { showNotification } from '../components/Notification/NotificationService';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({type: 'AUTH', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');
        
    } catch (error) {
        console.log(error);
    }
};

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        dispatch({type: 'AUTH', data})
        console.log(JSON.parse(localStorage.getItem('Profile')));
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error);
        alert('Incorrect email or password!!')
    }
}

export const googleSignup = (tokenId, navigate) => async (dispatch) => {
    try {
        const { data } = await api.googleSignup(tokenId);
        dispatch({ type: 'AUTH', data });
        localStorage.getItem('Profile', JSON.stringify(data.result));
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');
      } catch (error) {
        console.error('Google Sign-Up Failed:', error);
      }
  };

  export const googleSignin = (tokenId, navigate) => async (dispatch) => {
    try {
      const { data } = await api.googleSignin(tokenId);
      dispatch({ type: 'AUTH', data });
      localStorage.getItem('Profile', JSON.stringify(data.result));

      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In Failed:', error);
    }
  };



  export const resetPasswordRequest = (email, navigate) => async (dispatch) => {
    try {
      console.log("qwerty"+ email);
      await api.resetPasswordRequest(email);
      showNotification('Reset Password', 'Reset link sent to your email.');
      navigate('/'); // Navigate to home page or login page
    } catch (error) {
      console.error('Error requesting password reset:', error);
      showNotification('Error', 'Failed to send reset link.');
    }
  };
  
  export const resetPassword = (token, newPassword, navigate) => async (dispatch) => {
    try {
      await api.resetPassword(token, newPassword);
      console.log("111");
      showNotification('Password Reset', 'Your password has been reset.');
      navigate('/auth'); // Navigate to login page after successful password reset
    } catch (error) {
      console.error('Error resetting password:', error);
      showNotification('Error', 'Failed to reset password.');
    }
  };