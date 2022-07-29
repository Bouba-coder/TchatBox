import React, { useState } from 'react'
import classNames from 'classnames'
import { getTime, chatMainTime, isSameTime } from '../../../utils/dateUtils'
import DropDown from '../../shared/DropDown'
import DeleteModal from './DeleteModal'
import EditMessage from './EditMessage'

import HorizontalThreeDots from '../../../assets/horizontal_three_dots_icon.svg'
import PenIcon from '../../../assets/pen_icon.svg'
import AddEmojiIcon from '../../../assets/add_emoji_icon.svg'
import DeleteIcon from '../../../assets/delete_icon.svg'
import { GetMe } from '../../../hooks/actions'
import { useModal } from '../../../context/modal-context/modal-context'

export default function Message({
  chat,
  isSameTimePrev = false,
  isSameTimeNext = false,
  currentMsgEditId,
  setEditMessage,
}) {
  const me = GetMe()

  const [showSetting, setShowSetting] = useState(false)
  const { senderId, message, id } = chat
  const isAuthor = me?.user?.id === senderId.id
  const modal = useModal()
  function editModalToggle() {
    setEditMessage(id)
    setShowSetting(false)
  }

  function showDeleteModal() {
    setShowSetting(false)
    modal.showModal(<DeleteModal chat={chat} onClose={modal.hideModal} />, true)
  }

  function ShowEditedLabel(chat) {
    if (isSameTime(chat.createdAt, chat.updatedAt)) return null

    return (
      <>
        <span className='message-edited-label italic text-xxs'> (edited)</span>
      </>
    )
  }

  const dropDownItems = [
    {
      text: 'Edit Message',
      icon: <PenIcon className='w-4 h-4' />,
      cb: editModalToggle,
      style:
        'flex justify-between items-center text-sm px-4 py-1 mb-1 text-tchatbox-mainText hover:bg-tchatbox-experiment500Disabled rounded hover:text-white',
    },
    {
      text: 'Delete Message',
      icon: <DeleteIcon className='w-4 h-4' />,
      cb: showDeleteModal,
      style:
        'flex justify-between items-center text-sm px-4 py-1 text-tchatbox-red2 hover:bg-tchatbox-red2 rounded hover:text-white',
    },
  ]
  return (
    <div
      className={classNames(
        'w-full flex hover:bg-tchatbox-transparentBlack3 justify-between relative',
        {
          'bg-tchatbox-transparentBlack3': currentMsgEditId === id,
        }
      )}
      onMouseEnter={() => setShowSetting(true)}
      onMouseLeave={() => setShowSetting(false)}
    >
      {isSameTimePrev ? (
        <div className='w-full flex justify-start items-center px-4 mt-1'>
          <div className='flex w-full'>
            <p
              className={classNames(
                'w-12 flex flex-shrink-0 justify-center mt-1 text-tchatbox-sideBarChannels text-xxxs',
                {
                  invisible: !showSetting,
                }
              )}
            >
              {getTime(chat?.createdAt)}
            </p>
            {currentMsgEditId === id ? (
              <EditMessage chat={chat} onClose={setEditMessage} />
            ) : (
              <p className='text-tchatbox-100 break-all text-sm font-light ml-2 text-left'>
                {message}
                {ShowEditedLabel(chat)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          className={classNames('w-full flex justify-start items-start px-4', {
            'my-4': isSameTimeNext === false,
            'mt-4': isSameTimeNext === true,
          })}
        >
          <div className='flex justify-center'>
            <a
              href='#'
              className={`flex items-center mx-auto w-10 h-10 bg-tchatbox-${chat?.senderId?.color} text-white rounded-full inline-block`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='text-white w-5 h-5 fill-current mx-auto'>
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/>
              </svg>
            </a>
          </div>
          <div className='w-full flex flex-col ml-4'>
            <div className='flex items-center'>
              <a href='#' className='text-black capitalize hover:underline text-sm'>
                {senderId.username}
              </a>
              <span className='text-gray-500 ml-2 text-xxs'>
                {chatMainTime(chat.createdAt)}
              </span>
            </div>
            {currentMsgEditId === id ? (
              <EditMessage chat={chat} onClose={setEditMessage} />
            ) : (
              <div className='flex  w-full '>
                <p className='break-all text-tchatbox-100 text-sm font-light text-left'>
                  {message}
                  {ShowEditedLabel(chat)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {showSetting && (
        <ul className='flex bg-white absolute -top-3 right-5 hover:shadow-lg rounded-md'>
          {isAuthor && (
            <li
              className='mr-2 p-1 cursor-pointer hover:bg-tchatbox-itemHover'
              onClick={editModalToggle}
            >
              <PenIcon className='w-5 h-5 text-tchatbox-500' />
            </li>
          )}
          {isAuthor && (
            <li className='mr-2 p-1 cursor-pointer hover:bg-tchatbox-itemHover'>
              <DropDown
                ButtonComponent={HorizontalThreeDots}
                buttonClasses='w-5 h-5 text-tchatbox-500'
                items={dropDownItems}
              />
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
