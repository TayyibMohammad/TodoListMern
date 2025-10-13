import { useState } from 'react'
import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Header from './components/Header.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import './App.css'
import LeaderBoard from './pages/LeaderBoard.jsx'

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/leaderboard' element={<LeaderBoard/>}/>
      </Routes>
    </div>
  )
}

export default App
