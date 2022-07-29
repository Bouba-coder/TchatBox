import React from 'react'
import classNames from 'classnames'

import FriendsIcon from '../../../assets/friends.svg'

export default function Friends({ setPage, page, pendingRequests = 0 }) {
  return (
    <div className='flex pt-3 px-2 border-b-1 border-gray-900 w-full pb-2 bg-black justify-between'>
      <h6 className='text-white font-semibold text-2xl'>
        <FriendsIcon className='w-6 h-6 mr-2 inline-block text-green-400' />
        Tchatbox
      </h6>
      <ul className='flex ml-6 items-center'>
        <li className='ml-2'>
          <a
            href='#'
            onClick={() => setPage('online')}
            className={classNames('hover:text-green-300', {
              'text-green-400': page === 'online',
              'text-white': page !== 'online',
            })}
          >
            Online
          </a>
        </li>
        <li className='ml-8'>
          <a
            href='#'
            onClick={() => setPage('all')}
            className={classNames('hover:text-green-300', {
              'text-green-400': page === 'all',
              'text-white': page !== 'all',
            })}
          >
            All
          </a>
        </li>
        <li className='ml-8 flex justify-center items-center'>
          <a
            href='#'
            onClick={() => setPage('pending')}
            className={classNames('hover:text-green-300', {
              'text-green-400': page === 'pending',
              'text-white': page !== 'pending',
            })}
          >
            Pending
          </a>
          {!!pendingRequests && (
            <span className='rounded-full h-5 w-5 flex items-center justify-center ml-1 bg-red-600 text-white text-xs'>
              {pendingRequests}
            </span>
          )}
        </li>
        <li className='ml-8'>
          <a
            href='#'
            onClick={() => setPage('blocked')}
            className={classNames('hover:text-green-300', {
              'text-green-400': page === 'blocked',
              'text-white': page !== 'blocked',
            })}
          >
            Blocked
          </a>
        </li>
      </ul>
          <button
            onClick={() => setPage('add_friend')}
            className={classNames(
              'text-white text-sm p-px px-2 rounded-md focus:outline-none',
              {
                'text-green-460': page === 'add_friend',
                'bg-transparent': page === 'add_friend',
                'bg-green-600': page !== 'add_friend',
              }
            )}
          >
            Add Friend
          </button>
    </div>
  )
}
