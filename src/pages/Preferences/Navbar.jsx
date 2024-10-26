import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='grid grid-cols-[auto,1fr] px-4 py-4 bg-gray-100 bg-gray-200 dark:bg-gray-800 shadow'>
        <Link
        to="/"
        type="button"
        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className='sr-only'>Back</div>
        <ChevronLeftIcon className="h-2.5 w-2.5" aria-hidden="true" />
      </Link> 
        <div className='flex justify-between'>
            <h1 className='text-lg pl-2 font-semibold self-center dark:text-white font-mono'>Back</h1>   
            <h1 className='flex text-lg pl-4 font-semibold self-center dark:text-white font-mono'>Preferences</h1> 
        </div>  
    </div>
  )
}

export default Navbar
