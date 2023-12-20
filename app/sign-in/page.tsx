'use client'
import {Button, Container, TextField} from "@mui/material";
import React from "react";

export default function Page() {

  const signInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = {
      username: data.get('username'),
      password: data.get('password')
    }
    // const response = await fetch('/api/user/listPage')
    // const result = await response.json()
    // console.log(result)
    const response = await fetch('/api/user/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    const result = await response.json()
    console.log(result)
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
            />
          <Button type='submit' fullWidth variant='contained'>SignIn</Button>
        </form>
      </Container>
    </main>
  )
}
