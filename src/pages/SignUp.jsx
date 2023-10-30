import React, { useState } from 'react'
import '../css/login.css'
import { Container, Label } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { UserService } from '../services/UserService'

export default function SignUp() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({ success: true, message: "", data: {} })
    const [isLoading, setIsLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const formik = useFormik(
        {
            initialValues: {
                username: "",
                email: "",
                password: "",
                cpassword: ""
            },
            validationSchema: Yup.object({
                username: Yup.string().min(2, "Must be 2 character or more.").max(15, "Must be 15 character or less.").required("Required"),
                email: Yup.string().email("Invalid email adress.").required("Required"),
                password: Yup.string().min(6, "Must be 6 character or more.")
                    .oneOf([Yup.ref('cpassword')], "Passwords must be same.")
                    .required("Required"),
                cpassword: Yup.string().min(6, "Must be 6 character or more.")
                    .oneOf([Yup.ref('password')], "Passwords must be same.")
                    .required("Required")
            }),
            onSubmit: (values) => {
                setIsLoading(true)
                let userService = new UserService()
                userService.signUp(values).then(result => {
                    setData(result.data)
                    if (result.data.success) {
                        setShowMessage(true)
                    }
                    setIsLoading(false)
                })
            }
        }
    )

    return (
        <Container style={{ display: "flex", justifyContent: "center" }}>

            <form className="form" onSubmit={formik.handleSubmit}>
                <div className="flex-column">
                    <label>Username</label>
                </div>
                <div className="inputForm">
                    <svg
                        height="20"
                        viewBox="0 0 16 16"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Layer_3" data-name="Layer 3">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </g>
                    </svg>
                    <input
                        id='username'
                        type="text"
                        className="input"
                        placeholder="Enter your username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                    />
                    
                </div>
                {formik.touched.username && formik.errors.username ? <Label pointing color='red' basic>{formik.errors.username}</Label> : null}
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <svg
                        height="20"
                        viewBox="0 0 32 32"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Layer_3" data-name="Layer 3">
                            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                        </g>
                    </svg>
                    <input
                        id='email'
                        type="text"
                        className="input"
                        placeholder="Enter your Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.email && formik.errors.email ? <Label pointing color='red' basic>{formik.errors.email}</Label> : null}
                
                <div className="flex-column">
                    <label>Password</label>
                </div>
                <div className="inputForm">
                    <svg
                        height="20"
                        viewBox="-64 0 512 512"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875-48-48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                    </svg>
                    <input
                        id='password'
                        type={showPassword ? "text" : "password"}
                        className="input"
                        placeholder="Enter your Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    <svg style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    </svg>
                </div>
                {formik.touched.password && formik.errors.password ? <Label pointing color='red' basic>{formik.errors.password}</Label> : null}
                

                <div className="flex-column">
                    <label>Confirm Password</label>
                </div>
                <div className="inputForm">
                    <svg
                        height="20"
                        viewBox="-64 0 512 512"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875-48-48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                    </svg>
                    <input
                        id='cpassword'
                        type={showConfirmPassword ? "text" : "password"}
                        className="input"
                        placeholder="Retype your password"
                        onChange={formik.handleChange}
                        value={formik.values.cpassword}
                        onBlur={formik.handleBlur}
                    />
                    <svg
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleConfirmPasswordVisibility()}
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    </svg>
                </div>
                {formik.touched.cpassword && formik.errors.cpassword ? <Label pointing color='red' basic>{formik.errors.cpassword}</Label> : null}
                

                <div className="flex-row">
                    <span className="span" style={{ right: 0 }}>Forgot password?</span>
                </div>
                <button
                    className="button-submit"
                    disabled={isLoading}
                >Sign Up</button>
                {!data.success ? <Label color='red'>{data.message}</Label> : null}
                {showMessage && <Label color='green' >We sent verification link to your email. <br /> Please, click the link to verify your account</Label>}
                <p className="p">
                    Already have an account? <span className="span" onClick={() => navigate("/login")}>Log In</span>
                </p>
                <p className="p line">Or With</p>
                <div className="flex-row">
                    <button className="btn google">
                        <svg
                            version="1.1"
                            width="20"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            style={{ enableBackground: 'new 0 0 512 512' }}
                            xmlSpace="preserve"
                        >
                            <path
                                style={{ fill: '#FBBB00' }}
                                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
      c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
      C103.821,274.792,107.225,292.797,113.47,309.408z"
                            ></path>
                            <path
                                style={{ fill: '#518EF8' }}
                                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
      c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
      c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                            ></path>
                            <path
                                style={{ fill: '#28B446' }}
                                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
      c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
      c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                            ></path>
                            <path
                                style={{ fill: '#F14336' }}
                                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
      c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
      C318.115,0,375.068,22.126,419.404,58.936z"
                            ></path>
                        </svg>
                        Google
                    </button>
                    <button className="btn apple">
                        <svg
                            version="1.1"
                            height="20"
                            width="20"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 22.773 22.773"
                            style={{ enableBackground: 'new 0 0 22.773 22.773' }}
                            xmlSpace="preserve"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
                                    ></path>
                                    <path
                                        d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c-0.846-0.52-2.009-0.963-3.304-0.765c-0.555,0.086-1.122,0.276-1.619,0.464 c-0.471,0.181-1.06,0.502-1.618,0.485c-0.378-0.011-0.754-0.208-1.135-0.347c-1.116-0.403-2.21-0.865-3.652-0.648 c-1.733,0.262-2.963,1.032-3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                        Apple
                    </button>
                </div>
                
            </form>
            
        </Container>
    )
}
