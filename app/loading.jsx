import React from 'react'

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="border-4 border-solid border-gray-200 border-t-4 border-t-blue-500 rounded-full w-48 h-48 animate-spin"></div>
        </div>
    )
}

export default Loading