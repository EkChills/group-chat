import PusherWrapper from '@/components/PusherWrapper'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import SessProvider from '@/components/providers/SessProvider'
import ClientProvider from '@/components/react-query/ClientProvider'
import { cn } from '@/lib/utils'
import { RoomProvider } from '@/components/providers/Context'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-[#252329]')}>
        <SessProvider>
        <ClientProvider>
         <RoomProvider> 
        {children}
        </RoomProvider>
        </ClientProvider>
        </SessProvider>
        <div id='sing-lay'></div>
        <Toaster  />
        </body>
    </html>
  )
}
