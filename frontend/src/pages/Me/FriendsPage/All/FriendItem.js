import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import DMIcon from '../../../../assets/dm_icon.svg'

import { OPEN_ROOMS } from '../../../../constants/queryKeys'
import { DM_URL } from '../../../../constants/history.constants'
import LoadingCircle from '../../../../assets/loading_circle_icon.svg'
import { getOrCreateRoom } from '../../../../api/room'
import { isIncoming } from '../utils'
import AlertModal from '../../../../components/shared/Modal/AlertModal'
import apiErrorHandler from '../../../../utils/apiErrorHandler'
import { useModal } from '../../../../context/modal-context/modal-context'

export function friendObject(user, request) {
  if (isIncoming(user, request)) return request.from

  return request.to
}

export default function PendingItem({ user, friend }) {
  const [isLoading, setIsLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const modal = useModal()
  const cache = useQueryClient()
  const history = useHistory()

  async function openDM(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      const { data } = await getOrCreateRoom(friendObject(user, friend).id)

      if (data) {
        cache.invalidateQueries(OPEN_ROOMS)
        history.push(DM_URL(data.id))
      } else {
        setIsLoading(false)
      }
    } catch (err) {
      const result = apiErrorHandler(err)
      setAlertMessage(result)
      modal.showModal(
        <AlertModal
          onClose={modal.hideModal}
          message={alertMessage}
          title={'Error'}
        />,
        true
      )
      setIsLoading(false)
    }
  }

  return (
    <li
      className='p-2 py-3 hover:bg-gray-100 cursor-pointer border-t-1 border-gray-500'
      onClick={openDM}
    >
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div
              className={`flex justify-center items-center w-8 h-8 bg-tchatbox-${
                isIncoming(user, friend)
                  ? friend?.from?.color
                  : friend?.to?.color
              } text-gray-500 hover:text-tchatbox-100 rounded-full`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-5 w-5 text-white fill-current'>
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
              </svg>
            </div>
          </div>
          <div className='flex items-center flex-col ml-4'>
            <p className='text-gray-500 my-auto text-sm font-semibold'>
              {friendObject(user, friend).username}
            </p>
          </div>
        </div>

        <div className='flex'>
          <button
            onClick={openDM}
            className='flex items-center justify-center p-2 mx-1 rounded-full bg-tchatbox-bgSecondary focus:outline-none'
          >
            {isLoading ? (
              <LoadingCircle className='animate-spin h-5 w-5 text-tchatbox-100' />
            ) : (
              <DMIcon className='fill-current w-5 h-5 text-gray-500' />
            )}
          </button>
        </div>
      </div>
    </li>
  )
}
