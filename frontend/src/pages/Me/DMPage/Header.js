import React from 'react'
import friendObject from '../../../utils/friendObject'
import AtSignIcon from '../../../assets/at_sign_icon.svg'
import OfflineStatusIcon from '../../../assets/offline_status_icon.svg'

export default function Header({ user, room }) {
  let userName
  if (room && user) {
    userName = friendObject(
      user,
      room,
      'sender.id',
      'sender',
      'receiver'
    ).username
  }

  return (
    <div className='flex text-white h-12 border-b-1 border-tchatbox-900'>
      <div className='flex-1 flex items-center justify-between bg-black border-b border-tchatbox-900 px-4'>
        <div className='flex items-center'>
          <h5 className='flex justify-start items-center ml-2 cursor-pointer text-sm text-white font-bold'>
            {userName}
          </h5>
        </div>
      </div>
    </div>
  )
}
