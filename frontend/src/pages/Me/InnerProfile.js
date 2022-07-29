import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import DMList from './DMList'
import { ME_PAGE } from '../../constants/history.constants'
import checkCurrentPath from '../../utils/checkCurrentPath'
import FriendsIcon from '../../assets/friends.svg'
import TchatBox from '../../assets/tchatbox_logo.svg'

export default function Header({ ProfileWidgetComponent, location }) {
  const { pathname } = location
  return (
    <div className='relative w-96 bg-white border-l-1 border-gray-300 drop-shadow-xl min-h-screen flex flex-col items-center scrollbar--show--hide channels--scrollbar justify-between'>
      <div className='flex flex-col w-full'>
        <div className='px-3 w-full mt-2 flex flex-row  items-center'>
          <Link
            to={ME_PAGE}
            className={classNames(
              'flex items-center mx-auto w-12 h-12 bg-black border-2 border-white hover:text-white hover:rounded-2xlg duration-100 transition ease-linear inline-block',
              {
                'rounded-full text-tchatbox-100': !pathname.startsWith(ME_PAGE),
                'bg-white text-white rounded-2xlg':
                  pathname.startsWith(ME_PAGE),
              }
            )}
          >
            <TchatBox className='h-10 w-10 mx-auto' />
          </Link>
        </div>
        <ul className='p-2 mt-1 px-3 w-full'>
          <li
            className={classNames(
              'w-full p-1 hover:curser-pointer hover:text-tchatbox-100 hover:bg-tchatbox-itemHover',
              {
                'text-tchatbox-100': checkCurrentPath(location, ME_PAGE),
                'bg-tchatbox-itemHover': checkCurrentPath(location, ME_PAGE),
                'text-tchatbox-sideBarChannels': !checkCurrentPath(
                  location,
                  ME_PAGE
                ),
              }
            )}
          >
          </li>
        </ul>
        <div className='flex-1 flex overflow-y-hidden'>
          <DMList />
        </div>
      </div>

      {ProfileWidgetComponent}
    </div>
  )
}
