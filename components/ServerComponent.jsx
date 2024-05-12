import React from 'react'
import { CheckOrDelete, TodoTitledesc } from './Client'

const ServerComponent = () => {
    return (
        <div>ServerComponent</div>
    )
}

export default ServerComponent

export const TodoItem = ({title, description, id, isCompleted}) => {
    return (
        <div className="bg-white flex justify-between m-auto shadow-md rounded w-3/4 px-4 py-2 mb-4">
            <TodoTitledesc title={title} description={description} />
            <CheckOrDelete id={id} isCompleted={isCompleted}  />
        </div>
    )
}