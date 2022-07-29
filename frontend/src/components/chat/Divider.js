import React from 'react'
import { chatDividerFormat } from '../../utils/dateUtils'

export default function Divider({ date }) {
  return (
    <div className='flex h-1 border-b-1 justify-center items-center text-center border-tchatbox-backgroundModifierAccent mx-4 my-2'>
      <span className='px-2 py-1 text-black text-xxs rounded-full'>
        {chatDividerFormat(date)}
      </span>
    </div>
  )
}
