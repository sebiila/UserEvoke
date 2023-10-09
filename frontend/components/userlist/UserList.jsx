"use client"

import React, { useEffect, useState } from 'react';

const UserList = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
       
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);  
  
  return (
    <div>
          <ul className="space-y-4 md:w-2/3">
      {users.map((user) => (
        <li key={user.id} className="bg-white shadow-md p-4 md:flex  justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          
        </li>
      ))}
    </ul>
    </div>
  )
}

export default UserList
