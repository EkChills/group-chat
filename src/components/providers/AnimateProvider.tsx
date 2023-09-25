"use client"

import { AnimatePresence } from "framer-motion"


export default function AnimateProvider({children}:{children:React.ReactNode}) {
  return (
    <AnimatePresence>
      {children}
    </AnimatePresence>
  )
}
