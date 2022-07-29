import React from 'react'
import Setting from './Setting'
import { GetMe } from '../hooks/actions/index'
import { useModal } from '../context/modal-context/modal-context'

export default function ProfileWidget({ user }) {
  const me = GetMe()
  const modal = useModal()

  function showSettingModal() {
    modal.showModal(<Setting onClose={modal.hideModal} />)
  }

  return (
    <div className='bg-black py-2 px-1 flex items-center justify-between w-full '>
      <div className='flex items-center'>
        <div className='relative flex justify-center'>
          <a
            href='#'
            className={`relative flex items-center mx-auto w-10 h-10 bg-tchatbox-${me?.user?.color} text-white hover:text-tchatbox-100 rounded-full inline-block`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-6 w-6 fill-current mx-auto text-white'>
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
            </svg>
          </a>
        </div>
        <div className='flex items-center flex-col ml-2'>
          <p className='text-white text-xs font-bold'>{user?.username}</p>
          <p className='text-tchatbox-mainText text-xxs'>#{user?.shortId}</p>
        </div>
      </div>
      <div className='flex items-center mr-2'>
        <div>
          <a
            href='#'
            className='flex items-center p-2 mx-auto text-tchatbox-topIcons hover:bg-tchatbox-selectMuted hover:text-tchatbox-mainTextHover rounded-lg'
            onClick={showSettingModal}
          >
            <svg aria-hidden='false' width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z'
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
