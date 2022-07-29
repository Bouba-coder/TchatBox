import React from 'react'
import { AllFriendsRequests } from '../../../../hooks/reactQuery'
import FriendItem from './FriendItem'
import { useAppState } from '../../../../context/app-state-context'

function EmptyState({ setPage }) {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <p className='p-2 text-gray-600 text-xl mt-6'>
        There are no friends at this time.
      </p>
    </div>
  )
}

function PendingHeader({ allFriends }) {
  const pendingCount = allFriends?.length ?? 0
  return (
    <div className='flex justify-start items-center w-full mt-2'>
      <h6 className='my-2 text-black text-xs font-semibold'>
        FRIENDS ({pendingCount})
      </h6>
    </div>
  )
}

export default function All({ setPage }) {
  const { appState } = useAppState()
  const { user } = appState
  const { data: allFriends } = AllFriendsRequests()

  if (allFriends?.length) {
    return (
      <div className='flex h-full flex-1'>
        <div className='flex flex-col w-full p-4 px-10'>
          <PendingHeader allFriends={allFriends} />

          <div className='flex w-full'>
            <ul className='w-full flex flex-col'>
              {allFriends?.map((friend, index) => (
                <FriendItem key={index} user={user} friend={friend} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='flex h-full flex-1'>
      <EmptyState setPage={setPage} />
    </div>
  )
}
