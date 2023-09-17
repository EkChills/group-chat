"use client"

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useGlobalContext } from "./providers/Context"


interface Props {

}

const Sidebar = ({}:Props) => {
  const {setIsSidebarOpen, isSidebarOpen} = useGlobalContext()
  return (
    <>
    {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-50">
      <div className="absolute  bg-[#120F13] top-0 left-0 bottom-0 right-[4rem]">

      </div>
      <Button className="top-[1rem] right-[.2rem] z-50 rounded-lg bg-[#120F13] text-white absolute active:border active:border-white" onClick={() => setIsSidebarOpen(false)} > <X /></Button>

    </div>}
    </>
  )
}

export default Sidebar