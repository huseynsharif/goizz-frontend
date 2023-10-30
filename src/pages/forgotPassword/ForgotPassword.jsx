import React, { useState } from 'react'
import { Container, Form, Label } from 'semantic-ui-react'
import { UserService } from '../../services/UserService';

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [result, setResult] = useState({ success: false, message: "", data: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false)

  const sendEmail = () => {
    console.log(email);
    let userService = new UserService()
    userService.forgotPasswordEmailVerification(email).then(result => setResult(result.data))
    setShowMessage(true)
  }

  return (
    <div> <Container style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "200px" }}>
      <Form >
        <Form.Field >
          <label for="email">Please, enter the email</label>
          <input
            id='email'
            placeholder='email'
            type='email'
            onChange={(value) => setEmail(value.target.value)}
          // value={email}
          />
        </Form.Field>
        <button type='submit' onClick={sendEmail} disabled={isLoading} className='login-signup-submit-button'> <span>Send email</span></button>
        {!result.success ? <p>{result.message}</p> : null}
        {showMessage && <Label color='green' basic >We sent link to your email.</Label>}
      </Form>

    </Container></div>
  )
}
