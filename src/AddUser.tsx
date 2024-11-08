// src/AddUser.tsx
import React, { useState } from 'react';
import { addUser } from './api';
import { User } from './types/User';

interface AddUserProps {
  onUserAdded: (newUser: User) => void; // Prop to handle new user addition
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded }) => {
  const [userData, setUserData] = useState<User>({
    id: 0,
    username: '',
    passwd: '',
    email: '',
    firstname: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const newUser = await addUser(userData);
      onUserAdded(newUser); // Call the prop function with the new user
      setSuccess('User added successfully!');
      // Clear form after successful submission
      setUserData({ id: 0, username: '', passwd: '', email: '', firstname: '' });
    } catch (err) {
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="passwd"
            value={userData.passwd}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
