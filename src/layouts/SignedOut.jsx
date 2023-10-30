import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

export default function SignedOut() {

    const navigate = useNavigate();


    return (

        <div>
            <Menu position='right'>
                <Menu.Item>
                        <button class="uiverse" onClick={() => navigate("/signup")}>
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
                        <button className='login-button'
                            onClick={() => navigate("/login")}
                        ><div className='login-container'><span>Login</span></div></button>
                </Menu.Item>
            </Menu>
        </div>
    )
}
