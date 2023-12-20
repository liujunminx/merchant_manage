'use client'
import {Button, Container, FormHelperText, TextField} from "@mui/material";
import React, {useState} from "react";
import {signIn} from "@/service/user";

export default function Page() {

  const [helperText, setHelperText] = useState('')

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
            <FormHelperText className='text-red-500 text-center'>{helperText}</FormHelperText>
            <Button type='submit' fullWidth variant='contained'>SignIn</Button>
          </form>
        </Container>
      </main>
  )
}
