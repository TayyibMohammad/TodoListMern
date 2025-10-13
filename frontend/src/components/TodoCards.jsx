import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function TodoCards( {id, title, description, color, isDone} ) {

  const [isCompleted, setIsCompleted] = useState(isDone)
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const navigate = useNavigate()

  const API_BASE_URL = 'http://localhost:5000/api'

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token, navigate]) 

  const handleToggle = async () => {
    const api_url=`${API_BASE_URL}/todos/${id}`
    const data={
      completed:!isCompleted
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.put(api_url, data, config)

    if(response.status === 200){
      setIsCompleted(!isCompleted)
    }
  }

  return (
    <div 
      className={`bg-gray-800 border-2 rounded-xl p-6 m-3 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
        isCompleted ? 'opacity-60 border-gray-600' : 'border-gray-700'
      }`}
      style={{
        borderLeftWidth: '6px',
        borderLeftColor: color || '#3b82f6'
      }}
    >
      <div className='flex justify-between items-start gap-4'>
        <div className='flex-1 space-y-3'>
          <h3 className={`font-bold text-2xl text-white transition-all ${
            isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {title}
          </h3>
          <p className={`text-gray-400 leading-relaxed ${
            isCompleted ? 'line-through text-gray-600' : ''
          }`}>
            {description}
          </p>
          {isCompleted && (
            <span className='inline-block px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full border border-green-700'>
              ✓ Completed
            </span>
          )}
        </div>
        
        <div className='flex items-center'>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input 
              type="checkbox" 
              className='sr-only peer' 
              checked={isCompleted} 
              onChange={handleToggle}
            />
            <div className='w-14 h-8 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-blue-600'></div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default TodoCards