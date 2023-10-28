import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserService } from '../services/UserService';

export default function VerifyEmailWithLink() {

  const [verifResult, setVerifResult ]= useState({});

  const { userId, token } = useParams();
  useEffect(() => {
    const values = {
      userId: userId,
      token: token,
    }
    let userService = new UserService()
    userService.verifyAccountWithLink(values).then(result =>{
      setVerifResult(result.data);
    })
    
  }, [])
  

  return (
    <div>
      {verifResult.success ? <h1>You have been verified.</h1> : <h1>You have not been verified</h1>}
    </div>
  )
}
