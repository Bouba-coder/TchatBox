import React from 'react'
import { useAppState } from '../../../context/app-state-context'
import { Me } from '../../../hooks/reactQuery'


export default function Account({ onClose }) {
  const { appState } = useAppState()
  const { data: userData } = Me(appState?.user?.user)

  return (
    <div className='flex flex-col mt-2'>
      users 
    </div>
  )
}
