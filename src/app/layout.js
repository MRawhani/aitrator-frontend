import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import { Suspense } from 'react'
import ReduxProvider from '../components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aitrator - AI Image Generation',
  description: 'Generate and manage AI-generated images',
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </ReduxProvider>
      </body>
    </html>
  )
}