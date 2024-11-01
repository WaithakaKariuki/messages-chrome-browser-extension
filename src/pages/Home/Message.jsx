/*global chrome*/
import { Disclosure } from '@headlessui/react'
import { BarsArrowDownIcon, BarsArrowUpIcon, CalendarIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import React, { memo } from 'react'

const Message = memo(function Message({message,onUpdateMessage}) {
  // check if a message is read and update it
  function handleReadMessage(){
    fetch(`http://localhost:3000/messages/${message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        read: true,
      }),
    })
      .then((r) => r.json())
      .then((updatedMessage) => onUpdateMessage(updatedMessage));
  }

  return (
      <Disclosure  as="div" key={message.id} >
        {({ open }) => (
          <>
            <dt>
              <div className="block hover:bg-green-100 bg-gray-100 dark:bg-gray-900 dark:hover:bg-green-900">
                <div className="px-2 py-1.5 sm:px-2">
                  <div className="flex items-center justify-between">
                    <div className="sm:flex">
                      {message.read == false?
                        (<div className="animate-pulse flex items-center">
                          <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-green-500 dark:text-green-400 font-semibold" aria-hidden="true" />
                        </div>)
                        :
                        (<div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-700 dark:text-gray-300 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                          </svg>
                        </div>)
                      } 
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-200 sm:mt-0 border-b">
                      <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      <div className='text-blue-600 dark:text-blue-200'>
                        <time dateTime={message.timestamp}>{message.timestamp}</time>
                      </div>
                    </div>
                    <div className="ml-1 flex flex-shrink-0">
                      {message.priority == "high"?
                      (<p className="animate-pulse inline-flex rounded-full bg-green-200 dark:bg-green-800 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-200">
                      {message.priority}
                      </p>)
                      :
                      (<p className=" inline-flex rounded-full bg-red-50 dark:bg-red-950 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-200">
                        {message.priority}
                      </p>)
                      }                   
                    </div>
                  </div>
                  <p className="text-ellipsis mt-2 truncate text-sm font-medium text-indigo-700 dark:text-indigo-100" >{(message.content).slice(0,10)}...</p>
                  <div className="mt-0 flex sm:flex sm:justify-between justify-center">
                    <Disclosure.Button                                      
                      className="flex items-center justify-end text-sm text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 sm:mt-0 sm:ml-6 -mb-1">
                      {open ? 
                      (
                      <BarsArrowUpIcon 
                      onClick = {handleReadMessage}
                      className=" mr-1.5 h-6 w-6 flex-shrink-0 text-gray-800 dark:text-gray-200 justify-end" 
                      aria-hidden="true" />                   
                      ) : (
                      <BarsArrowDownIcon
                        className="h-6 w-6 animate-bounce" 
                        aria-hidden="true" 
                        />
                      )}                     
                      </Disclosure.Button>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-center bg-gray-200 dark:bg-gray-800 rounded-md">
                      <Disclosure.Panel className="p-1">
                        <p className="text-wrap my-1 pl-1 text-center hover:text-left text-sm font-medium text-indigo-700 hover:indigo-900 dark:text-indigo-50">{message.content}</p>
                      </Disclosure.Panel>
                  </div>               
                </div>
              </div>
            </dt>
          </>
        )}
      </Disclosure>
  )
})

export default Message
