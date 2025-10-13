import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TodoCards from '../components/TodoCards'

const API_BASE_URL = 'http://localhost:5000/api'

export default function ProfilePage() {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('#3b82f6') // Default blue color
    const [todos, setTodos] = useState([])
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/signin')
        }
    }, [token, navigate])

    const fetchUser = useCallback(async () => {
        if (!token) return

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/users/user`, config)
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Fetch error", error)
        }
    }, [token])

    const fetchTodos = useCallback(async () => {
        if (!token) return

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/todos`, config)
            setTodos(response.data)
        } catch (error) {
            console.error("Fetch error", error)
        }
    }, [token])

    useEffect(() => {
        if (token) {
            fetchTodos()
            fetchUser()
        }
    }, [token, fetchTodos, fetchUser])

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            alert("Title and Description cannot be empty.")
            return
        }

        const data = {
            title,
            description,
            color,
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/todos/add`, data, config) 
            alert("To Do list created successfully")
            
            fetchTodos()

            setTitle('')
            setDescription('')
            setColor('#3b82f6')

        } catch (error) {
            alert("Error creating to do list");
            console.error("Error while submitting: ", error)
        }
    }

    if (!token) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
                <div className='text-white text-xl'>Loading...</div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header Section */}
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6'>
                    <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg flex-1'>
                        <h1 className='text-3xl font-bold text-white mb-2'>
                            Welcome back, <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500'>{user.name}</span>
                        </h1>
                        <p className='text-gray-400 flex items-center gap-2'>
                            <span className='text-sky-500'>📝</span>
                            {user.bio}
                        </p>
                    </div>
                    
                    {/* Add Todo Form */}
                    <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl w-full md:w-96'>
                        <div className='flex items-center justify-center mb-6'>
                            <h2 className='text-2xl font-bold text-white'>Add New Todo</h2>
                        </div>
                        
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor="title" className='block text-sm font-medium text-gray-300 mb-2'>
                                    Title
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter todo title" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} 
                                    className='w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition'
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="description" className='block text-sm font-medium text-gray-300 mb-2'>
                                    Description
                                </label>
                                <textarea 
                                    placeholder='Describe your todo...' 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} 
                                    rows="3"
                                    className='w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none'
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="color" className='block text-sm font-medium text-gray-300 mb-2'>
                                    Accent Color 
                                    <span className='ml-2 px-3 py-1 rounded text-xs font-mono bg-gray-700' style={{color: color}}>
                                        {color}
                                    </span>
                                </label>
                                <input 
                                    type="color" 
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)} 
                                    className='w-full h-12 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer'
                                />
                            </div>

                            <button 
                                onClick={handleSubmit} 
                                className='w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg py-3 transition duration-200 transform hover:scale-[1.02] shadow-lg'
                            >
                                Add Todo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Todos Section */}
                <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-3xl font-bold text-white'>Your Todos</h2>
                        <span className='px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm font-semibold'>
                            {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
                        </span>
                    </div>
                    
                    {todos.length > 0 ? (
                        <div className='space-y-3'> 
                            {todos.map((todo) => (
                                <TodoCards 
                                    key={todo._id}
                                    id={todo._id}
                                    title={todo.title} 
                                    description={todo.description} 
                                    color={todo.color} 
                                    isDone={todo.completed} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-12'>
                            <div className='text-6xl mb-4'>📋</div>
                            <p className='text-gray-400 text-lg'>No todos yet. Create your first one above!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
