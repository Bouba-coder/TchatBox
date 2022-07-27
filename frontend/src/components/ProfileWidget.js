import React from 'react'
import Setting from './Setting'
import { GetMe } from '../../hooks/actions/index'
import { useModal } from '../../context/modal-context/modal-context'

export default function ProfileWidget({ user }) {
  const me = GetMe()
  const modal = useModal()

  function showSettingModal() {
    modal.showModal(<Setting onClose={modal.hideModal} />)
  }

  return (
    <div className='bg-tchatbox-secondPrimary py-2 px-1 flex items-center justify-between w-full '>
      <div className='flex items-center'>
        <div className='relative flex justify-center'>
          <a
            href='#'
            className={`relative flex items-center mx-auto w-10 h-10 bg-tchatbox-${me?.user?.color} text-white hover:text-tchatbox-100 rounded-full inline-block`}
          >
            <svg
              className='w-6 h-6 text-center mx-auto'
              aria-hidden='false'
              width='28'
              height='20'
              viewBox='0 0 28 20'
            >
              <path
                fill='currentColor'
                d='M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z'
              ></path>
            </svg>
          </a>
          <span
            className='bg-tchatbox-green w-3 h-3 rounded-full absolute right-0 bottom-0'
            style={{ right: '-3px', bottom: '4px' }}
          ></span>
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
            className='flex items-center p-2 mx-auto text-tchatbox-topIcons hover:bg-tchatbox-selectMuted hover:text-tchatbox-mainTextHover rounded-lg inline-block'
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
