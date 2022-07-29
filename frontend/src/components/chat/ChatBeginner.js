import React from 'react'
import friendObject from '../../utils/friendObject'

export default function EmptyChat({ room, user }) {
  let userName
  if (room && user) {
    userName = friendObject(user, room, 'sender.id', 'sender', 'receiver')
      .username
  }

  return (
    <div className='flex flex-col justify-end p-4'>
      <div className='relative flex items-center justify-start'>
        <div
          className={`flex justify-center items-center w-20 h-20 bg-tchatbox-${
            friendObject(user, room, 'sender.id', 'sender', 'receiver').color
          } text-white rounded-full`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-12 h-12 text-white fill-current'>
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
          </svg>
        </div>
      </div>
      <div className='flex flex-col justify-start'>
        <h1 className='text-gray-600 text-3xl font-bold capitalize'>{userName}</h1>
        <p className='text-gray-600 text-sm'>
          This is the beginning of your direct message history with{' '}
          <span className='font-bold'>@{userName}.</span>
        </p>
      </div>
    </div>
  )
}
