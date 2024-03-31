"use client"

import React, {useEffect, useState} from 'react';
import {authenticate} from "@/service/user";
import {redirect, useRouter} from "next/navigation";
import SignInPage from './sign-in/page'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('token: ' + token)
    if (token) {
      authenticate(token).then((res: any) => {
        if (res)
          setAuthorized(true)
      }).catch((err: any) => {
        setAuthorized(false)
      }).finally(() => {
        if(!authorized) {
          router.push('/sign-in')
        }
      })
    }
  }, [authorized, router])

  return (authorized?children:<SignInPage />)
}

export default ProtectedRoute
