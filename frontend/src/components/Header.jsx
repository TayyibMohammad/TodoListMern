import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg'></div>
            <h1 className='text-xl font-bold text-white'>TodoIt</h1>
          </div>
          
          <nav className='flex items-center gap-8'>
            <Link 
              to="/leaderboard" 
              className='text-gray-300 hover:text-white font-medium transition duration-200 relative group'
            >
              LeaderBoard
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200'></span>
            </Link>
            <Link 
              to="/profile" 
              className='text-gray-300 hover:text-white font-medium transition duration-200 relative group'
            >
              Profile
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200'></span>
            </Link>
            <Link 
              to="/signin" 
              className='px-4 py-2 text-gray-300 hover:text-white font-medium transition duration-200'
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className='px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 shadow-md'
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
