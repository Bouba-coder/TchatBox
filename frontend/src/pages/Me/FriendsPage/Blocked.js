import React from 'react'

function EmptyState() {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <p className='p-2 text-gray-600 text-xl mt-6'>
        You have no blocked users
      </p>
    </div>
  )
}

export default function Blocked() {
  return (
    <div className='flex h-full flex-1'>
      <EmptyState />
    </div>
  )
}
