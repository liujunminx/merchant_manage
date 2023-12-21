'use client'
import {Button, Container, FormHelperText, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {signIn} from "@/service/user";

export default function Page() {

  const [helperText, setHelperText] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const signInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = {
      username: data.get('username'),
      password: data.get('password')
    }
    try {
      const result = await signIn(params)
    } catch (error: any) {
      setHelperText(error.message)
    }
  }

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword !== password) {
      setPasswordError('The entered passwords are inconsistent')
    }
  }

  return (
      <main>
        <Container maxWidth='xs' className='mt-24'>
          <form onSubmit={signInSubmit}>
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
            <Button type='submit' fullWidth variant='contained' style={{textTransform: 'none'}}>Sign In</Button>
            <Button fullWidth variant='outlined' className='mt-2' style={{textTransform: 'none'}}>Sign Up</Button>
          </form>
        </Container>
      </main>
  )
}
