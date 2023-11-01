import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import '../css/navi.css'
import { useNavigate } from 'react-router-dom'
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';

export default function Navi() {

  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem('isLoggedIn')


  return (
    <div>
      <Menu size='massive'>
        <button
          className='menubutton'
          onClick={() => navigate('/homepage')}
        >Home</button>

        {isLoggedIn && (<><div className='separator' />
          <button
            className='menubutton'
            onClick={() => navigate('/my-quizzes')}
          >My Quizzes</button>
          <div className='separator' />
          <button
            className='menubutton'
            onClick={() => navigate('/join-quiz')}
          >Join quiz</button></>)}




        <Menu.Menu position='right'>
          {isLoggedIn ? <SignedIn /> : <SignedOut />}
        </Menu.Menu>
      </Menu>
    </div>
  )
}
