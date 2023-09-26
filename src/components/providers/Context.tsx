"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type InitialState = {
  roomId:string
  setRoomId: Dispatch<SetStateAction<string>>
  isSidebarOpen:boolean;
  isLogoutOpen:boolean;
  setIsLogoutOpen:Dispatch<SetStateAction<boolean>>
  setIsSidebarOpen:Dispatch<SetStateAction<boolean>>
}

export const RoomContext = createContext<InitialState>({roomId:'', setRoomId:() =>{}, isSidebarOpen:false, isLogoutOpen:false, setIsLogoutOpen:() => {}, setIsSidebarOpen:() => {}})

export const RoomProvider = ({children}:{children:React.ReactNode}) =>{
  const [roomId, setRoomId] = useState<string>('')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false)
  

  return <RoomContext.Provider value={{roomId, setRoomId, isSidebarOpen, setIsSidebarOpen, isLogoutOpen, setIsLogoutOpen}}>
    {children}
  </RoomContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(RoomContext)
}