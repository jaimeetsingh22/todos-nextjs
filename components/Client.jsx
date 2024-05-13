'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export const Context = createContext({ user: {} }) // iske madad se hum useContext use kar sakte hai

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then((data) => {
      if (data.success) setUser(data.user);
    })
  }, [])


  return (<Context.Provider value={{ user, setUser }}>
    <NextTopLoader height={5} color="lime" />
    {children}
    <Toaster />
  </Context.Provider>)
}


export const TodoTitledesc = ({ title, description }) => {
  return (

    <div>
      <h3 className="text-lg text-black font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>

  )
}

export const CheckOrDelete = ({ id, isCompleted }) => {
  const router = useRouter();
  const onDelete = async () => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);

      router.refresh();
    } catch (error) {
      console.log(error);
      return toast.error(error);
    }

  }


  const updateHandler = async () => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);

      router.refresh();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }

  }


  return (
    <>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={updateHandler}
          className="form-checkbox h-6 w-6 text-white accent-green-600"
        />
        <button onClick={onDelete} className="text-white hover:bg-white hover:border hover:border-black hover:text-black transition-all ease-in-out duration-300 bg-black p-2 ml-2">
          DELETE
        </button>
      </div>
    </>
  )
}




export const LoginLogoutButton = () => {
  const { user, setUser } = useContext(Context);

  const LogoutHandler = async () => {

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'get',
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      setUser({});

      toast.success(data.message);

    } catch (error) {
      toast.error(error);
      console.log(error);
    }

  }

  return user._id ? (
    <button className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white' onClick={LogoutHandler}>Log Out</button>
  ) : (<Link className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white' href={'/login'}>Login</Link>)
}
