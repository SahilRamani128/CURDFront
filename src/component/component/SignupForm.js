import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

const SignupForm = ({ handleSignup, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({ name, email, password, mobile });
  };

  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}>< MdClose/></div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="mobile">Mobile No:</label>
        <input type="number" id="mobile" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <button className="btn" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
