import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Form, Label } from 'semantic-ui-react';
import * as Yup from 'yup'
import { UserService } from '../../services/UserService';

export default function NewPassword() {

  const [result, setResult] = useState({})
  const { userId, token } = useParams()
  const navigate = useNavigate();

  const formik = useFormik(
    {
      initialValues: {
        password: "",
        cpassword: ""
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .oneOf([Yup.ref('cpassword')], "Passwords must be same.")
          .required("Required"),
        cpassword: Yup.string()
          .oneOf([Yup.ref('password')], "Passwords must be same.")
          .required("Required")
      }),
      onSubmit: (values) => {
        console.log("salam");
        const data = {
          userId: userId,
          token: token,
          password: values.password,
          cpassword: values.cpassword,
        }

        let userService = new UserService()
        userService.restorePassword(data).then(result => {
          if (result.data.success) {
            navigate("/login")
          }
        })
      }
    }
  )

  return (
    <div>
      <Container style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "200px" }}>
        <Form onSubmit={formik.handleSubmit} style={{ width: "400px" }}>
          <Form.Field>
            <label>Password</label>
            <input
              id='password'
              placeholder='password'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? <Label pointing basic color='red' mini>{formik.errors.password}</Label> : null}
          </Form.Field>
          <Form.Field>
            <label>Confirm password</label>
            <input
              id='cpassword'
              placeholder='cpassword'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.cpassword}
              onBlur={formik.handleBlur}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? <Label pointing basic color='red' mini >{formik.errors.cpassword}</Label> : null}
          </Form.Field>
          <button type='submit' className='login-signup-submit-button'> <span>Restore password</span></button>
          {!result.success ? <p>{result.message}</p> : null}
        </Form>
      </Container>
    </div>
  )
}
