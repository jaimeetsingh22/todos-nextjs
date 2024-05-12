'use client'
import { Context } from '@/components/Client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(Context);
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (!data.success) return toast.error(data.message);
            setUser(data.user);
            toast.success(data.message)

        } catch (error) {
            console.log(error);
            return toast.error(message);
        }
    }

    if (user._id) return redirect("/");

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="example@gmail.com" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******************" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-m">
                    <Link className='hover:text-blue-500' href={'/register'}>
                        New user? Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login