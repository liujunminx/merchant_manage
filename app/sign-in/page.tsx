'use client'
import {Button, Container, FormHelperText, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {signIn} from "@/service/user";
import {useRouter} from "next/navigation";

export default function Page() {

  const [helperText, setHelperText] = useState('')
  const router = useRouter()

  const signInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = {
      username: data.get('username'),
      password: data.get('password')
    }
    try {
      const result = await signIn(params)
      if (result) {
        router.push('/home')
      }
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
            <Typography color='error' className='text-center'>{helperText}</Typography>
            <Button type='submit' fullWidth variant='contained' style={{textTransform: 'none'}}>Sign In</Button>
            <Button fullWidth variant='outlined' style={{textTransform: 'none', marginTop: '10px'}} onClick={() => router.push('/sign-up')}>Sign Up</Button>
          </form>
        </Container>
      </main>
  )
}
