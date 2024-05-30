import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';

const TaskForm = ({ handleSubmit, handleOnChange, handleClose, rest, users }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}><MdClose/></div>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" onChange={handleOnChange} value={rest.title} />

        <label htmlFor="description">Description: </label>
        <textarea id="description" name="description" onChange={handleOnChange} value={rest.description} />

        <label htmlFor="assignedUsers">Assign to Users: </label>
        <select multiple={true} id="assignedUsers" name="assignedUsers" onChange={handleOnChange} value={rest.assignedUsers}>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
          ))}
        </select>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
