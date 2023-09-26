"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LogOut, UserCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import {signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'

interface Props {
  className?:string
}



const Details = React.forwardRef<HTMLDivElement,Props >((props, ref) => {
  const router = useRouter()
  function logout() {
    signOut()
    router.push('/login')
    router.refresh()
    toast({
      title:'Logged Out',
      description:'You have been logged out successfully.'
    })
  }
  return (
    <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0}}  ref={ref} className={cn('flex flex-col px-[1rem] bg-[#252329] rounded-[.5rem]', props.className)}>
      <Link className='h-[2.45rem] rounded-[.5rem] bg-[#3C393F] flex items-center space-x-[.66rem] px-[.75rem] ' href={'/profile'}>
      <UserCircle2 className='text-white' />
      <p className='text-[.75rem] font-[500] text-[#E0E0E0]'>My Profile</p>
      </Link>
      <div className='mt-[1.48rem] h-[1px] bg-[#3C393F]' />
      <button className='h-[2.45rem] rounded-[.5rem] flex items-center space-x-[.66rem] px-[.75rem] ' onClick={logout}>
      <LogOut className='text-[#EB5757] ' />
      <p className='text-[.75rem] font-[500] text-[#EB5757]'>Logout</p>
      </button>
    </motion.div>
  )

})


Details.displayName = 'Details'

export default Details


