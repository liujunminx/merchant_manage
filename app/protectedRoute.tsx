"use client"

import React, { useEffect } from 'react';
import {authenticate} from "@/service/user";
import {useRouter} from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authenticate(token).then((res: any) => {
        if (!res)
          router.push('/sign-in')
      }).catch((err: any) => {
        router.push('/sign-in')
      })
    } else {
      router.push('/sign-in')
    }
  }, [])

  return <>{children}</>
}

export default ProtectedRoute
