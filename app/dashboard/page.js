"use client"
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession , signIn , signout } from 'next-auth/react'
import Dashboard from '@/components/Dashboard'
const page = () => {
    const router = useRouter()
    const {data:session} = useSession()
            useEffect(() => {
                document.title = "Dashboard - Get Me A Drink"
                if (!session) {
                    router.push('/login');
                }
            }, [session])
            
  return (
    <div>
      <Dashboard/>
    </div>
  )
}

export default page
