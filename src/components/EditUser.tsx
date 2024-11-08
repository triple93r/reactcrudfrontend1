// src/components/EditUser.tsx
import React, { useState } from 'react';
import { updateUser } from '../api';
import { User } from '../types/User';

interface EditUserProps {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onUserUpdated }) => {
  const [formData, setFormData] = useState<User>(user);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const success = await updateUser(formData.id, formData);
      if (success) {
        onUserUpdated(formData); // Call callback function to update the user in parent component
      } else {
        setError("Failed to update user");
      }
    } catch (error) {
      setError("Error updating user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>

      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>

      <label>
        Password:
        <input type="password" name="passwd" value={formData.passwd} onChange={handleChange} />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>

      <label>
        First Name:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      </label>

      <button type="submit">Update User</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default EditUser;
