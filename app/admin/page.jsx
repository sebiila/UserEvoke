"use client"
import React, {useState} from 'react'
import AdminUser from '../../components/adminuser/AdminUser';

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
       <div className="flex flex-col   h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-200 text-white w-full   p-4 lg:p-8">
        <h1 className="text-2xl text-gray-500 font-semibold mb-4">Admin Dashboard</h1>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-800"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
      <div className="w-full md:w-3/4 p-4">
        <div className="flex justify-between my-4">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <button
          className="bg-gray-500 text-white px-4   rounded-md hover:bg-gray-700"
        
        >Create new user</button>
        </div>
       
        <AdminUser setSelectedUser={setSelectedUser} />
 
      </div>
    </div>
    </div>
  )
}

export default Admin
