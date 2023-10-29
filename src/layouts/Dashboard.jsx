import React from 'react'
import Navi from './Navi'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import VerifyEmailWithLink from '../pages/VerifyEmailWithLink'
import LogIn from '../pages/LogIn'

export default function Dashboard() {
  return (
    <div>
      <Navi />
      <Routes>
        <Route path='/login' Component={LogIn} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/verify-email-with-link/:userId/:token' Component={VerifyEmailWithLink} />
        
      </Routes>
    </div>
  )
}