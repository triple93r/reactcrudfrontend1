// src/components/UserList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import EditUser from './EditUser';
import AddUser from '../AddUser'; // Import AddUser component
import { getAllUsers, getUserById, deleteUser } from '../api';

const UserList: React.FC = () => {
  const [userId, setUserId] = useState<number | ''>('');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false); // State to manage Add User form visibility
  
  const handleSearch = async () => {
    setError(null);
    if (userId === '') return;
    try {
      const result = await getUserById(Number(userId)); // Convert userId to number
      setUser(result);
    } catch (err) {
      setError("User not found");
      setUser(null);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData); // Store users in state
      setError(null); // Reset error if successful
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== userId)); // Remove the user from state
        setError(null);
      setMessage("User deleted successfully.");
      fetchUsers(); // Set success message
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user); // Open the edit form for the selected user
  };

  const handleUserUpdated = (updatedUser: User) => {
    // Update the user in the users array
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null); // Close the edit form
  };

  const handleUserAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the list
    setIsAddingUser(false); // Hide the add user form
    setMessage("User added successfully."); // Show success message
  };

  

return (
  <div>
    <div>
      <h2>Search User by ID</h2>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder="Enter user ID"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h3>User Details</h3>
          <p>ID: {user.id}</p>
          <p>First Name: {user.firstname}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>

      <button onClick={fetchUsers}>Get All Users</button>

      {/* Add New User Button */}
      <button onClick={() => setIsAddingUser(!isAddingUser)}>
        {isAddingUser ? "Cancel" : "Add New User"}
      </button>

      {isAddingUser && <AddUser onUserAdded={handleUserAdded} />} {/* Conditionally render AddUser */}

      {error && <p>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Show success message */}



    <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstname} - {user.email}
            <button onClick={() => handleEditClick(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>

      {/* Render EditUser component only if a user is selected */}
      {selectedUser && (
        <EditUser key={selectedUser.id} user={selectedUser} onUserUpdated={handleUserUpdated} />
      )}
    </div>
  );
};

export default UserList;
