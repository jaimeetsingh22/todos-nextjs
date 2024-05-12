import { TodoItem } from '@/components/ServerComponent';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'


const fetchTodo = async (token) => {
    try {
        const res = await fetch(`${process.env.URL}/api/mytask`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                cookie: `token=${token}`,
            }
        });

        const data = await res.json();

        if (!data.success) return [];
        return data.tasks;


    } catch (error) {
        console.log(error);
        return [];
    }
}

const Todos = async () => {

    const token = cookies().get("token")?.value

    if (!token) return redirect("/login");

    const tasks = await fetchTodo(token);
    return (
        <div className='container h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-white'>
            {
                tasks?.map((i) => (
                    <TodoItem title={i.title} description={i.description} id={i._id} key={i._id} isCompleted={i.isCompleted} />
                ))
            }
        </div>
    )
}

export default Todos