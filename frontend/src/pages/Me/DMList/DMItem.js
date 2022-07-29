import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, Link } from 'react-router-dom'
import classNames from 'classnames'

import { OPEN_ROOMS } from '../../../constants/queryKeys'
import { DM_URL, ME_PAGE } from '../../../constants/history.constants'
import { getOrCreateRoom, closeDMApi } from '../../../api/room'
import apiErrorHandler from '../../../utils/apiErrorHandler'
import TchatBox from '../../../assets/tchatbox_logo.svg'
import LoadingCircle from '../../../assets/loading_circle_icon.svg'
import CloseIcon from '../../../assets/close_icon.svg'

export function friendObject(user, room) {
  if (user?.user?.id === room.sender.id) return room.receiver

  return room.sender
}

export default function DMItem({ user, room, match }) {
  const cache = useQueryClient()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [showCloseButton, setShowCloseButton] = useState(false)

  function currentPath() {
    if (match?.url) {
      return match?.url === DM_URL(room.id)
    }

    return false
  }

  async function closeDM(e) {
    e.stopPropagation()
    e.preventDefault()

    setIsLoading(true)

    try {
      const { data } = await closeDMApi(room.id)
      setIsLoading(false)

      if (data) {
        cache.invalidateQueries(OPEN_ROOMS)
        history.push(ME_PAGE)
      }
    } catch (err) {
      apiErrorHandler(err)
      setIsLoading(false)
    }
  }

  async function openDM(e) {
    e.stopPropagation()
    e.preventDefault()

    try {
      const { data } = await getOrCreateRoom(friendObject(user, room).id)
      if (data) {
        history.push(DM_URL(data.id))
      }
    } catch (err) {
      apiErrorHandler(err)
    }
  }

  return (
    <li
      className={classNames(
        'w-full px-1 py-1 hover:bg-gray-100 rounded cursor-pointer border-t-1 border-tchatbox-backgroundModifierAccent',
        {
          'bg-tchatbox-itemHover': currentPath(),
        }
      )}
      onClick={openDM}
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      <Link to={DM_URL(room?.id)} className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div
              className={`flex justify-center items-center w-8 h-8 bg-tchatbox-${
                friendObject(user, room).color
              } text-white hover:text-red-100 rounded-full`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='m-auto text-white fill-current h-5 w-5'>
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
              </svg> 
            </div>
          </div>
          <div className='flex items-start items-center ml-4'>
            <p
              className={classNames(' text-base', {
                'text-white': currentPath(),
                'text-gray-500': !currentPath(),
              })}
            >
              {friendObject(user, room).username}
            </p>
          </div>
        </div>

        <div className='flex'>
          {showCloseButton && (
            <button className='flex items-center justify-end p-2 rounded-full focus:outline-none z-10'>
              {isLoading ? (
                <LoadingCircle className='animate-spin h-4 w-4 text-tchatbox-100' />
              ) : (
                <CloseIcon
                  onClick={closeDM}
                  className='fill-current w-4 h-4 text-tchatbox-topIcons hover:text-tchatbox-100'
                />
              )}
            </button>
          )}
        </div>
      </Link>
    </li>
  )
}
