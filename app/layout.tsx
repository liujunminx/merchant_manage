'use client'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {createTheme, ThemeProvider} from "@mui/material";
import React from "react";
import ProtectedRoute from "@/app/protectedRoute";

const inter = Inter({ subsets: ["latin"] })

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={inter.className}>
        {/* eslint-disable-next-line react/no-children-prop */}
          <ProtectedRoute children={children}>

          </ProtectedRoute>
        </body>
      </ThemeProvider>
    </html>
  )
}
