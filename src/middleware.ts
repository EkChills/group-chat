export { default } from "next-auth/middleware"

export const config = { matcher: ["/:path*","/channel/:path*"] }