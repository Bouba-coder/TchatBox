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
      <div className='flex flex-col justify-start w-64'>
        <h4 className='text-xl font-bold text-black text-left'>
            Send a message to this
        </h4>
      </div>
    </div>
  )
}
