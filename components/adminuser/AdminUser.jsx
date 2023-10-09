"use client"

import React from 'react'
import { useState, useEffect } from "react";

const AdminUser = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  // Function to fetch user data from the backend
  const fetchUsers = async () => {
    try {
      // Make a GET request to fetch user data
      const response = await fetch("http://localhost:8800/api/users");  
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to set a user as admin
  const handleSetAsAdmin = async (userId) => {
    try {
      const response = await fetch(`/api/set-admin/${userId}`, {
        method: "PUT",
      });

      if (response.ok) {
        // Update the user's admin status in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, isAdmin: true } : user
          )
        );
      } else {
        console.error("Failed to set user as admin");
      }
    } catch (error) {
      console.error("Error setting user as admin:", error);
    }
  };

  return (
    <div>
          <ul className="space-y-4">
          {users.map((user) => (
          <li
            key={user.id}
            className="bg-white shadow-md p-4 md:flex  justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <button
                className="bg-gray-500 text-white px-2 py-1 m-2 rounded-md hover:bg-gray-600"
                onClick={() => setSelectedUser(user)}
              >
                Edit
              </button>
              <button
                className="bg-gray-500 text-white px-2 py-1 m-2 rounded-md hover:bg-gray-600"
                onClick={() => handleDeleteUser(user.id)} // Call delete user function
              >
                Delete
              </button>
              {!user.isAdmin && ( // Display "Set as Admin" button if the user is not already an admin
                <button
                  className="bg-purple-500 text-white px-2 py-1 m-2 rounded-md hover:bg-purple-600"
                  onClick={() => handleSetAsAdmin(user.id)} // Call set as admin function
                >
                  Set as Admin
                </button>
              )}
            </div>
          </li>
        ))}
    </ul>
    </div>
  )
}

export default AdminUser
