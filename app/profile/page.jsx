'use client'
import { Context } from '@/components/Client'
import { redirect } from 'next/navigation'
import React, { useContext } from 'react'

const Profile = () => {
  const { user } = useContext(Context)


  if(!user._id) return redirect('/login');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2">
        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
      <h2 className="text-xl font-medium text-gray-600">{user.email}</h2>
    </div>
  )
}

export default Profile