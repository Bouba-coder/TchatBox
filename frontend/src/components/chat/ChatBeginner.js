import React from 'react'
import friendObject from '../../utils/friendObject'
import TchatBox from '../../assets/tchatbox_logo.svg' 

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
          <TchatBox className='w-12 h-12' />
        </div>
      </div>
      <div className='flex flex-col justify-start'>
        <h1 className='text-black text-3xl font-bold'>{userName}</h1>
        <p className='text-black text-sm'>
          This is the beginning of your direct message history with{' '}
          <span className='font-semibold'>@{userName}.</span>
        </p>
      </div>
    </div>
  )
}
