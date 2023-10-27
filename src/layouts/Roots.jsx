import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Login from '../pages/Login'

export default function Roots() {
  return (
    <div>

      <Routes>
        <Route path='/login' Component={Login}/>
      </Routes>

    </div>
  )
}