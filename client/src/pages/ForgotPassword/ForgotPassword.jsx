import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../actions/auth';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPasswordRequest(email, navigate));
  } catch (error) {
      // setMessage(error.response.data.message);
  }
  };
  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetRequest}>
        <label >
          Enter your Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
