import React from "react";
import { listIndexes } from "../../../../../backend/src/models/token.model";
import { getUsers } from "../../../api/account";

function EmptyState() {
    return (
      <div className='flex flex-col justify-center w-full items-center'>
        <p className='p-2 text-gray-600 text-xl mt-6'>
            There are no users registered on Tchatbox
        </p>
      </div>
    )
  }


function UsersHeader({ allUsers }) {
  const usersCount = allUsers?.length ?? 0
  return (
    <div className='flex justify-start items-center w-full mt-2'>
      <h6 className='my-2 text-black text-xs font-semibold'>
        USERS ({usersCount})
      </h6>
    </div>
  )
}

export default function All({ setPage }) {
    const { appState } = useAppState()
    const { user } = appState
    const { data: allUsers } = getUsers()
  
    if (allUsers?.length) {
      return (
        <div className='flex h-full flex-1'>
          <div className='flex flex-col w-full p-4 px-10'>
            <UsersHeader allUsers={allUsers} />
  
            <div className='flex w-full'>
              <ul className='w-full flex flex-col'>
                {allUsers?.map((users, index) => (
                    <li key={index}>{users.username}</li>
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