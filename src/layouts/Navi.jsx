import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import '../css/navi.css'

export default function Navi() {
  return (
    <div>
      <Menu size='massive'>
        <button className='menubutton'>
          Home
        </button>

        <Menu.Menu position='right'>

          <Menu.Item>

            <button class="uiverse">
              <div class="wrapper">
                <span>Sign Up</span>
                <div class="circle circle-12"></div>
                <div class="circle circle-11"></div>
                <div class="circle circle-10"></div>
                <div class="circle circle-9"></div>
                <div class="circle circle-8"></div>
                <div class="circle circle-7"></div>
                <div class="circle circle-6"></div>
                <div class="circle circle-5"></div>
                <div class="circle circle-4"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-1"></div>
              </div>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button className='login-button'><div className='login-container'><span>Login</span></div></button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}
