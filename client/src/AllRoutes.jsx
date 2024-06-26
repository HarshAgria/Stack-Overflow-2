import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home.jsx'
import Auth from './pages/Auth/Auth.jsx'
import Questions from './pages/Questions/Questions.jsx'
import AskQuestion from './pages/AskQuestion/AskQuestion.jsx'
import DisplayQuestion from './pages/Questions/DisplayQuestion.jsx'
import Tags from './pages/Tags/Tags.jsx'
import Users from './pages/Users/Users.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import MainPage from './pages/PostContent/MainPage.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from './pages/ForgotPassword/ResetPassword.jsx'

const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/Auth' element={<Auth/>}/>
        <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>
        <Route exact path='/Questions' element={<Questions/>}/>
        <Route exact path='/AskQuestion' element={<AskQuestion/>}/>
        <Route exact path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route exact path='/Tags' element={<Tags/>}/>
        <Route exact path='/Users' element={<Users/>}/>
        <Route exact path='/Users/:id' element={<UserProfile/>}/>
        <Route  path='/Post' element={<MainPage/>}/>
    </Routes>
  )
}

export default AllRoutes;