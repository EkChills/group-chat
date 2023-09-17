"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type InitialState = {
  roomId:string
  setRoomId: Dispatch<SetStateAction<string>>
  isSidebarOpen:boolean;
  setIsSidebarOpen:Dispatch<SetStateAction<boolean>>
}

export const RoomContext = createContext<InitialState>({roomId:'', setRoomId:() =>{}, isSidebarOpen:false, setIsSidebarOpen:() => {}})

export const RoomProvider = ({children}:{children:React.ReactNode}) =>{
  const [roomId, setRoomId] = useState<string>('')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)


  return <RoomContext.Provider value={{roomId, setRoomId, isSidebarOpen, setIsSidebarOpen}}>
    {children}
  </RoomContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(RoomContext)
}