import React from 'react'

const TaskCard = ({ taskInfo }) => {
  return (
    <div className='px-4 py-1 rounded-lg shadow-lg h-fit my-3 bg-white'>
        <div className='flex flex-col'>
            <div className='flex justify-between items-baseline my-1'>
                <p className='text-xs text-gray-500'>Due date: {taskInfo.dueDate}</p>
                {taskInfo.priority && (
                    <p className='text-sm py-0.5 px-2 text-red-400 border border-red-400 rounded-lg'>Priority</p>
                )}
            </div>
            <div className='flex'>
                <h3 className='text-lg font-bold'>{taskInfo.taskTitle}</h3>
            </div>
            <p>{taskInfo.taskDescription}</p>
            <div className='flex justify-between items-center mt-6'>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <p className='text-gray-600'>{taskInfo.taskComments.length}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600    ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>

            </div>
        </div>
    </div>
  )
}

export default TaskCard