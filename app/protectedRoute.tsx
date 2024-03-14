"use client"

import React, {useEffect, useState} from 'react';
import {authenticate} from "@/service/user";
import {useRouter} from "next/navigation";

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
        if (!res)
          router.push('/sign-in')
        else
          setAuthorized(true)
      }).catch((err: any) => {
        router.push('/sign-in')
      })
    } else {
      router.push('/sign-in')
    }
  }, [])

  return (authorized && children)
}

export default ProtectedRoute
