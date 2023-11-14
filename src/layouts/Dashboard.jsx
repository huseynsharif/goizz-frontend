import React from 'react'
import Navi from './Navi'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import VerifyEmailWithLink from '../pages/VerifyEmailWithLink'
import LogIn from '../pages/LogIn'
import ForgotPassword from '../pages/forgotPassword/ForgotPassword'
import NewPassword from '../pages/forgotPassword/NewPassword'
import MyQuizzes from '../pages/MyQuizzes'
import AddQuiz from '../pages/AddQuiz'
import AddQuestion from '../pages/AddQuestion'
import Quiz from '../pages/Quiz'

export default function Dashboard() {
  return (
    <div>
      <Navi />
      <Routes>
        <Route path='/login' Component={LogIn} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/verify-email-with-link/:userId/:token' Component={VerifyEmailWithLink} />
        <Route path='/forgot-password' Component={ForgotPassword} />
        <Route path='/new-password/:userId/:token' Component={NewPassword} />
        <Route path='/my-quizzes' Component={MyQuizzes} />
        <Route path='/add-quiz' Component={AddQuiz} />
        <Route path='/add-question' Component={AddQuestion} />
        <Route path='/quiz/:quizId' Component={Quiz} />
        
      </Routes>
    </div>
  )
}