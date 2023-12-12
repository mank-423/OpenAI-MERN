import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAuthPage = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      // If user ID is already stored, redirect to the chat page
      navigate('/chat');
    }
  }, [navigate]);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/create', { userId });
      console.log(response.data);

      // Store user ID in local storage
      localStorage.setItem('userId', response.data.userId);

      // Redirect to the chat page
      navigate('/chat');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleGetUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      console.log(response.data);

      // Store user ID in local storage
      localStorage.setItem('userId', response.data.userId);

      // Redirect to the chat page
      navigate('/chat');
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">User Authentication</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create User
        </button>
        <button
          onClick={handleGetUserById}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Get User by ID
        </button>
      </div>
    </div>
  );
};

export default UserAuthPage;
