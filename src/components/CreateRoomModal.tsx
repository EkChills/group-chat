'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { baseUrl } from "@/lib/authOptions"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2, Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "./ui/use-toast"

export function CreateRoomModal() {
  const [channelInfo, setChannelInfo] = useState<{
    channelName:string;
    channelDescription:string; 
  }>({channelName:'', channelDescription:''})
  const {data:session} = useSession()
  const queryClient = useQueryClient()

  function handleChannelChange<T extends HTMLInputElement | HTMLTextAreaElement>(e:React.ChangeEvent<T>){
    const {name, value} = e.target
    setChannelInfo(prev => ({...prev, [name]:value}))
  }

  const mutation = useMutation({
    mutationKey:['rooms/create'],
    mutationFn:async() => {
      return axios.post(`${baseUrl}/api/rooms`, {
        roomName:channelInfo.channelName,
        roomDescription:channelInfo.channelDescription
      })
    },
    onSuccess:() => {
      queryClient.invalidateQueries(['chatRooms'])
      toast({
        title:'Channel Created',
        description:`Your new channel ${channelInfo.channelName} was created`
      })
    }
  })

  function handleSubmit() {
    mutation.mutate()
  }

  console.log(mutation);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
      <button className="flex items-center justify-center w-[2rem]  rounded-[.5rem] bg-[#252329] hover:brightness-125 transition-all duration-300">
      <Plus className=" text-white w-[1.2rem]" />
      </button>      
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none" >
        <DialogHeader>
          <DialogTitle className="font-bold text-[#F2F2F2] text-left">New Channel</DialogTitle>
            <DialogDescription className="text-left text-[#F2F2F2]">
              Create a new public channel.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="flex w-full items-center">
            <Input id="name" value={channelInfo.channelName} name="channelName" onChange={(e) => handleChannelChange<HTMLInputElement>(e)} className="col-span-3 placeholder:text-[#828282] bg-[#3C393F] text-[#F2F2F2] w-full" placeholder="Channel name"  />
          </div>
          <div className="w-full">
            <textarea id="username" value={channelInfo.channelDescription} name="channelDescription" onChange={(e) => handleChannelChange<HTMLTextAreaElement>(e)} placeholder="Channel description"  className="col-span-3 placeholder:text-[#828282] p-4 bg-[#3C393F] rounded-[.5rem]  w-full text-white outline-none focus:outline-white" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-[#2F80ED]">{mutation.isLoading ? <Loader2 /> : 'Save Changes' }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
