import { QueryClient } from '@tanstack/react-query'
const client = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 20, // 20 seconds
    },
  },
})
export default client
