import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const LoginForm = ({ handleLogin, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}><MdClose/></div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
