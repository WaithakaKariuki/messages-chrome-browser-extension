import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle({toggleDarkMode,darkMode}) {

  return (
    <Switch.Group as="div" className="flex items-center justify-evenly px-4 py-4 bg-gray-100 bg-gray-200 dark:bg-gray-800 border-t border-gray-800 dark:border-white">
      <span className="flex flex-grow flex-col">
        <Switch.Label as="span" className="text-lg font-medium text-gray-900 dark:text-white" passive>
          Toggle DarkMode
        </Switch.Label>
      </span>
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        className={classNames(
          darkMode ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            darkMode ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}