"use client"

import Pusher from 'pusher-js'
import React from 'react'
import { PusherProvider } from 'react-pusher-hoc'

export const pusherClient = new Pusher('19c40ea8cb2bb237501a', {
  cluster: 'eu'
});

export default function PusherWrapper({children}:{children:React.ReactNode}) {

  return (
    <PusherProvider value={pusherClient}>
      {children}
    </PusherProvider>
  )
}
