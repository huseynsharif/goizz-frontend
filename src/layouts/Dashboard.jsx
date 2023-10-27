import React from 'react'
import Navi from './Navi'
import Login from '../pages/LogIn'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from '../pages/SignUp'

export default function Dashboard() {
  return (
    <div>
      <Navi />
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={SignUp} />

      </Routes>
    </div>
  )
}