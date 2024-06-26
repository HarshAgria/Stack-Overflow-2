import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import './ResetPassword.css'

const ResetPassword = () => {
  const { token } = useParams();
  // console.log(token.resetToken);
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log('Sending reset password request with token:', token, 'and new password:', newPassword);
    dispatch(resetPassword(token, newPassword, navigate));
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>
          Enter New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter your new password'
            required
          />
        </label>
        <button type="submit">Set New Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
