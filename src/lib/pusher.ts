import Pusher from 'pusher'

const pusherServer = new Pusher({
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
  cluster: "eu",
  useTLS: true
});


export {pusherServer} 