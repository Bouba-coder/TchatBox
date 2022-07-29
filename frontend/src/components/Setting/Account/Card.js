/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import UpdateUserName from './UpdateUserName'
import UpdateEmail from './UpdateEmail'
import { useModal } from '../../../context/modal-context/modal-context'
import getSocket from '../../../api/socket'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import { useAppState } from '../../../context/app-state-context'
import { LOGIN_PAGE } from '../../../constants/history.constants'
import { ME_SOCKET } from '../../../constants/socket.routes'
import { logout } from '../../../api/auth'
import CloseIcon from '../../../assets/close_icon.svg'

export default function Card({ user, onClose }) {
  const {
    appState: { user: userStorage },
    setAppState,
  } = useAppState()
  const history = useHistory()
  const cache = useQueryClient()
  const socket = getSocket(userStorage?.user?.tokens?.access?.token)
  const modal = useModal()

  function showUserNameModal() {
    modal.showModal(
      <UpdateUserName onClose={modal.hideModal} user={user} />,
      true
    )
  }

  function showEmailModal() {
    modal.showModal(<UpdateEmail onClose={modal.hideModal} user={user} />, true)
  }

  const logoutHandler = async () => {
    if (userStorage?.user) {
      try {
        await logout(userStorage?.tokens?.refresh?.token)
        cache.clear()
        console.log('logout')
        setAppState({ user: null })
        modal.hideModal()
        history.push(LOGIN_PAGE)
        //disconnect socket after logout.
        socket.emit(ME_SOCKET.LOGOUT, { userId: userStorage?.user?.id })
        socket.close()
      } catch (err) {
        console.log('err: ', err)
        modal.hideModal()
      }
    }
  }

  return (
    <div className='w-full flex flex-col mx-4 mx-auto'>
      <div className='flex justify-between mt-16'>
        <h3 className='text-white text-xl font-bold'>My Account</h3>
        <div className='flex flex-col mr-2' onClick={onClose}>
          <button className='rounded-full p-2 flex items-center justify-center hover:bg-gray-200 bg-white border-2 border-white focus:outline-none'>
            <CloseIcon className='fill-current w-4 h-4 text-tchatbox-topIcons' />
          </button>
          <h6 className='text-white text-sm text-center'>Esc</h6>
        </div>
      </div>

      <div className={`w-full bg-tchatbox-${user?.color} h-20 relative rounded-t-lg`}>
        <div className='flex items-center absolute bottom-0 left-0 -mb-16 ml-4'>
          <div className='relative flex justify-center'>
            <a
              href='#'
              className={`relative flex items-center mx-auto w-20 h-20 bg-tchatbox-${user?.color} text-white rounded-full inline-block p-2 border-6 border-tchatbox-900`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='m-auto text-white fill-current h-12 w-12'>
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
              </svg>           
            </a>
          </div>
          <div className='flex items-center ml-4'>
            <p className='text-white text-medium font-bold'>{user?.username}</p>
            <p className='text-tchatbox-mainText text-medium'>
              #{user?.shortId}
            </p>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col bg-tchatbox-900 p-4'>
        <button className='self-end w-24 bg-tchatbox-experiment500 text-white p-1 rounded-md text-xs text-center hover:bg-tchatbox-experiment500Disabled'>
          Edit Profile
        </button>
        <div className='p-4 flex flex-col mt-8  bg-gray-700 rounded-lg'>
          <div className='flex justify-between mt-2'>
            <div className='flex flex-col'>
              <span className='text-xxs text-tchatbox-mainText font-semibold'>
                USERNAME
              </span>
              <h6 className='text-white text-xs'>
                {user?.username}{' '}
              </h6>
            </div>
            <button
              onClick={showUserNameModal}
              className='bg-tchatbox-grayDeep text-white p-1 px-4 rounded text-sm text-center'
            >
              Edit
            </button>
          </div>

          <div className='flex justify-between mt-6'>
            <div className='flex flex-col'>
              <span className='text-xxs text-tchatbox-mainText font-semibold'>
                EMAIL
              </span>
              <h6 className='text-white text-xs'>
                {user?.email}{' '}
              </h6>
            </div>
            <button
              onClick={showEmailModal}
              className='bg-tchatbox-grayDeep text-white p-1 px-4 rounded text-sm text-center'
            >
              Edit
            </button>
          </div>
        </div>
        <div className='w-full flex flex-row justify-end pt-6 pr-2'>
          <button onClick={logoutHandler} className='item-centers rounded-md'>
            <span className='text-sm font-medium tracking-tight text-white p-4 bg-red-600 hover:bg-red-700'>
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
