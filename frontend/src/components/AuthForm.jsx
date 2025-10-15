import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../lib/axios'

function AuthForm( {isSignIn} ) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if(!isSignIn){
                const data={
                    username:name,
                    email:email,
                    password:password,
                    bio:bio
                }

                const responsePromise=await api.post('/users/signup', data)
                console.log(responsePromise.status)
                
                if(responsePromise.status===201){
                    alert("account created successfully!")
                    navigate('/profile')
                    localStorage.setItem('token', responsePromise.data.token)
                }
            }
            else{
                const data={
                    email:email,
                    password:password
                }

                const responsePromise=await api.post('/users/signin', data)

                if(responsePromise.status===200){
                    alert("Sign in successfully!")
                    navigate('/profile')
                    localStorage.setItem('token', responsePromise.data.token)
                }
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
  
    return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4'>
        <div className='w-full max-w-md'>
            <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold text-white mb-2'>
                    {isSignIn ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className='text-gray-400'>
                    {isSignIn ? 'Sign in to continue' : 'Join us today'}
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className='bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-700'>
                {!isSignIn && (
                    <div className='space-y-2'>
                        <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name" 
                            onChange={(e) => setName(e.target.value)} 
                            className='w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition'
                        />
                    </div>
                )}
                
                <div className='space-y-2'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-300'>Email</label>
                    <input 
                        type="email" 
                        placeholder="you@example.com" 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition'
                    />
                </div>
                
                <div className='space-y-2'>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-300'>Password</label>
                    <input 
                        type="password" 
                        placeholder='••••••••' 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition'
                    />
                </div>
                
                {!isSignIn && (
                    <div className='space-y-2'>
                        <label htmlFor="bio" className='block text-sm font-medium text-gray-300'>Bio</label>
                        <textarea 
                            placeholder='Tell us about yourself...' 
                            onChange={(e) => setBio(e.target.value)} 
                            rows="3"
                            className='w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none'
                        />
                    </div>
                )}
                
                <button 
                    type="submit" 
                    className='w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-lg py-3 transition duration-200 transform hover:scale-[1.02] shadow-lg'
                >
                    {isSignIn ? 'Sign In' : 'Create Account'}
                </button>
            </form>
            
            <p className='text-center text-gray-400 mt-6 text-sm'>
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
                <span className='text-sky-400 hover:text-sky-300 cursor-pointer font-medium'>
                    {isSignIn ? 'Sign up' : 'Sign in'}
                </span>
            </p>
        </div>
    </div>
  )
}

export default AuthForm
