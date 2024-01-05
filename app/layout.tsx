'use client'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {createTheme, ThemeProvider} from "@mui/material";

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }

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
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
