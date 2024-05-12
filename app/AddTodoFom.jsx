'use client'
import { Context } from '@/components/Client';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(Context);
  const router = useRouter();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newtask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description }),
      })
      const data = await res.json();

      if (!data.success) return toast.error(data.message)

      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      return toast.error(error);
    }
  }

  if (!user._id) return redirect("/login");
   
  return (
    <div className="flex  items-center justify-center">
      <div className="b shadow-md mt-20 rounded px-8 pt-6 pb-8 mb-4 w-3/4">
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input className="appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:shadow-outline" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" id="title" />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea className="appearance-none border rounded w-full py-2 px-3 leading-tight text-black focus:shadow-outline" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" id="description" rows="4"></textarea>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTodoForm