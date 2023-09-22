"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const ReactQueryDevtoolsProduction = React.lazy(() =>
import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
  (d) => ({
    default: d.ReactQueryDevtools,
  }),
),
)

export default function ClientProvider({children}:{children:React.ReactNode}) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [showDevtools, setShowDevtools] = React.useState(false)



React.useEffect(() => {
  // @ts-ignore
  window.toggleDevtools = () => setShowDevtools((old) => !old)
}, [])

  return (
    <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
      {children}
      </QueryClientProvider>
  )
}
