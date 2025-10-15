import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import api from '../lib/axios'

function LeaderBoard() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    const API_BASE_URL = 'http://localhost:5000/api'

    const fetchUser = useCallback(async () => {
        if (!token) return

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await api.get('/users/user', config)
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Fetch error", error)
        }
    }, [token, API_BASE_URL])

    const calculateLast7DaysPoints = (points) => {
        if (!points || points.length === 0) return 0;
        
        const last7Days = points.slice(-7);
        return last7Days.reduce((sum, point) => sum + (point.value || 0), 0);
    }

    const fetchUsers = useCallback(async () => {
        try {
            // const response = await axios.get(`${API_BASE_URL}/users`);
            const response = await api.get('/users')
            console.log(response)
            const fetchedUsers = response.data;
            
            const sortedUsers = fetchedUsers.sort((a, b) => {
                const aPoints = calculateLast7DaysPoints(a.points);
                const bPoints = calculateLast7DaysPoints(b.points);
                return bPoints - aPoints;
            });
            
            setUsers(sortedUsers);
        } catch (error) {
            console.error(error);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const getMedalEmoji = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return null;
    }

    const getRankStyle = (index) => {
        if (index === 0) return 'from-yellow-500 to-yellow-600 shadow-yellow-500/50';
        if (index === 1) return 'from-gray-400 to-gray-500 shadow-gray-500/50';
        if (index === 2) return 'from-amber-600 to-amber-700 shadow-amber-600/50';
        return 'from-gray-700 to-gray-800';
    }
  
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-white mb-2'>
                        🏆 Leaderboard
                    </h1>
                    <p className='text-gray-400'>Top performers based on last 7 days</p>
                </div>

                {/* Leaderboard Cards */}
                <div className='space-y-3'>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div 
                                key={user._id} 
                                className={`bg-gradient-to-r ${getRankStyle(index)} rounded-xl p-5 flex justify-between items-center transition-all duration-300 hover:scale-[1.02] border ${
                                    index < 3 ? 'border-opacity-50 shadow-lg' : 'border-gray-700'
                                }`}
                            >
                                <div className='flex items-center gap-4'>
                                    {/* Rank */}
                                    <div className='flex items-center gap-2'>
                                        {getMedalEmoji(index) ? (
                                            <span className='text-3xl'>{getMedalEmoji(index)}</span>
                                        ) : (
                                            <span className='text-gray-400 text-2xl font-bold w-10 text-center'>
                                                #{index + 1}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* User Info */}
                                    <div>
                                        <p className='text-white font-bold text-xl'>
                                            {user.username}
                                        </p>
                                        {user.bio && (
                                            <p className='text-gray-300 text-sm mt-1'>
                                                {user.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Points */}
                                <div className='text-right'>
                                    <p className='text-white font-bold text-2xl'>
                                        {calculateLast7DaysPoints(user.points).toFixed(1)}
                                    </p>
                                    <p className='text-gray-300 text-sm'>points</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-12'>
                            <div className='text-6xl mb-4'>📊</div>
                            <p className='text-gray-400 text-lg'>No users found</p>
                        </div>
                    )}
                </div>

                {/* Current User Stats (if logged in) */}
                {user && (
                    <div className='mt-8 bg-gray-800 border border-sky-500 rounded-xl p-6'>
                        <h3 className='text-xl font-bold text-white mb-3'>Your Stats</h3>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-gray-400'>Your Username</p>
                                <p className='text-white font-semibold text-lg'>{user.username}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-gray-400'>Last 7 Days</p>
                                <p className='text-sky-400 font-bold text-2xl'>
                                    {calculateLast7DaysPoints(user.points).toFixed(1)} pts
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeaderBoard
