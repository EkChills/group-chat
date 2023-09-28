"use client"

import React from 'react'
import {motion} from 'framer-motion'
import { cn } from '@/lib/utils';

export default function FramerTransition({children,className}:{children:React.ReactNode, className?:string;}) {
  return (
    <motion.div className={cn('', className)} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>
      {children}
    </motion.div>
  )
}
