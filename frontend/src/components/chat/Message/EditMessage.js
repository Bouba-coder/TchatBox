import React, { useCallback, useEffect, useState } from 'react'
import { editMessage } from '../../../api/messages'
import { useQueryClient } from 'react-query'
import { ROOM_MESSAGES_KEY } from '../../../constants/queryKeys'
import { ROOM_SOCKET } from '../../../constants/socket.routes'

import getSocket from '../../../api/socket'
import { GetMe } from '../../../hooks/actions'

export default function EditMessage({ chat, onClose }) {
  const me = GetMe()

  const { message, id } = chat
  const [textMessage, setTextMessage] = useState(message)

  const cache = useQueryClient()

  const socket = getSocket(me.tokens?.access?.token)

  const closeOnEscape = useCallback((event) => {
    event = event || window.event

    let isEscape = false
    if ('key' in event) {
      isEscape = event.key === 'Escape' || event.key === 'Esc'
    } else {
      isEscape = event.keyCode === 27
    }

    if (isEscape) {
      onClose()
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape, true)

    return function cleanUp() {
      return document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  async function handleInputSubmit(e) {
    if (e.key === 'Enter') {
      if (!textMessage || !textMessage.trim()) return

      try {
        const { data } = await editMessage(id, textMessage.trim())

        // populate actual sender object
        data.senderId = me?.user

        cache.setQueryData(ROOM_MESSAGES_KEY(data.roomId), (d) => {
          let index = -1
          let editId = -1
          let alreadyFound = false

          d?.pages.forEach((p, i) => {
            const foundIndex = p.results.findIndex((m) => m.id === data.id)

            if (foundIndex !== -1 && alreadyFound === false) {
              editId = foundIndex
              alreadyFound = true
              index = i
            }
          })

          if (index !== -1 && editId !== -1) {
            d.pages[index].results[editId] = data
          }

          return d
        })

        // notify by socket
        socket.emit(ROOM_SOCKET.ROOM_SEND_EDIT_MESSAGE, data)

        onClose()
      } catch (e) {
        console.log('e: ', e)
      }
    }
  }

  return (
    <div className='w-full flex'>
      <div className='relative w-full bg-gray-700 flex items-center m-4 rounded-lg p-1 mb-5'>
        <div className='w-full flex flex-1 bg-gray-700'>
          <input
            type='text'
            className='flex-1 bg-gray-700 placeholder-tchatbox-200 p-1 text-tchatbox-100 text-sm focus:outline-none leading-normal'
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyDown={handleInputSubmit}
          />
        </div>
        <p className='text-black text-xxs absolute -bottom-4'>
          escape to{' '}
          <span
            onClick={() => onClose()}
            className='text-blue-600 hover:underline cursor-pointer'
          >
            cancel
          </span>{' '}
          • enter to{' '}
          <span
            onClick={() => onClose()}
            className='text-blue-600 hover:underline cursor-pointer'
          >
            save
          </span>
        </p>
      </div>
    </div>
  )
}
