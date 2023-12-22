'use client'
import {Button, Container, FormHelperText, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {signIn, signUp} from "@/service/user";
import {useRouter} from "next/navigation";

export default function Page() {

  const [helperText, setHelperText] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()

  const signUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passwordError) {
      return
    }
    const data = new FormData(event.currentTarget)
    const params = {
      username: data.get('username'),
      password: data.get('password')
    }
    try {
      const response = await signUp(params)
      if (response) {
        router.push('/sign-in')
      }
    } catch (error: any) {
      setHelperText(error.message)
    }
  }

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword !== password) {
      setPasswordError('The entered passwords are inconsistent')
    } else {
      setPasswordError('')
    }
  }

  const handlePasswordBlur = () => {
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setPasswordError('The entered passwords are inconsistent')
      } else {
        setPasswordError('')
      }
    }
  }

  return (
      <main>
        <Container maxWidth='xs' className='mt-24'>
          <form onSubmit={signUpSubmit}>
            <TextField
                required
                fullWidth
                margin='normal'
                id='username'
                label='Username'
                name='username'
                defaultValue='Username'
            />
            <TextField
                required
                fullWidth
                margin='normal'
                id='username'
                label='Password'
                name='password'
                type='password'
                defaultValue='Password'
                onChange={e => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
            />
            <TextField
              required
              fullWidth
              margin='normal'
              id='confirmPassword'
              label='confirmPassword'
              name='confirmPassword'
              type='password'
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              error={Boolean(passwordError)}
              helperText={passwordError}
              />
            <Typography color='error' className='text-center'>{helperText}</Typography>
            <Button type='submit' fullWidth variant='contained' className='mt-2' style={{textTransform: 'none'}}>Sign Up</Button>
          </form>
        </Container>
      </main>
  )
}
