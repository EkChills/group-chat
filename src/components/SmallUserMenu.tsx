"use client"

import { ChevronDown, LogOut, UserCircle2 } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Details from "./Details"
import { useGlobalContext } from "./providers/Context"
import AnimateProvider from "./providers/AnimateProvider"
import { useOnClickOutside } from "@/lib/hooks/useOnClickOutside"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

interface Props {

}

const SmallUserMenu = ({}:Props) => {
  const {data:session} = useSession()
  const smallRef = useRef<HTMLDivElement | null>(null)
  const [smallLogoutOpen, setSmallLogoutOpen] = useState<boolean>(false)
  const router = useRouter()
  const {isLogoutOpen, setIsLogoutOpen} = useGlobalContext()
  function closeLogout(e:MouseEvent | TouchEvent) {
    setSmallLogoutOpen(false)
  }
  useOnClickOutside(smallRef, closeLogout)
  
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
    <div className='bg-[#0B090C] bottom-0 inset-x-0 px-[1rem] py-[1rem] absolute flex items-center w-full'>
    <div className='flex items-center space-x-[1.75rem] relative'>
        {/* <span className='w-[2.625rem] h-[2.625rem] rounded-[0.4375rem] font-bold text-white text-3xl bg-[#FF4500] text-center '>{session?.user.name?.slice(0,2)}</span> */}
        <Image src={session?.user.image as string} alt='user avatar' width={42} height={42} />
        <p className='text-[1rem] text-[#828282] font-bold'>{session?.user.name}</p>
        {smallLogoutOpen && <AnimateProvider>
        <motion.div ref={smallRef} onClick={() => console.log('im clocked')} initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0}}  className={cn('flex z-[500] flex-col px-[1rem] bg-[#252329] rounded-[.5rem]', 'absolute w-[12rem]  left-[4.6rem] py-[1rem] bottom-8')}>
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
        </AnimateProvider>}
      </div>
      <ChevronDown className='text-[#BDBDBD] ml-auto cursor-pointer' onClick={() => setSmallLogoutOpen(true)} />
    </div>
  )
}

export default SmallUserMenu