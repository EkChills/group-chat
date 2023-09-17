import { NextResponse } from 'next/server';
import {Server} from 'socket.io'
import Pusher from 'pusher'

export async function POST() {
const pusher = new Pusher({
  appId: "1661960",
  key: "19c40ea8cb2bb237501a",
  secret: "6702da4a339665f5f564",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

}