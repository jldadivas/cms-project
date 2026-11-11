import 'server-only'

import { getLocalDevelopmentServerURL } from './getLocalDevelopmentOrigins'

const isLocalURL = (url: string): boolean => {
  const hostname = new URL(url).hostname

  return hostname === 'localhost' || hostname === '127.0.0.1'
}

export const getServerSideURL = (): string => {
  const configuredURL = process.env.NEXT_PUBLIC_SERVER_URL

  if (process.env.NODE_ENV === 'development' && (!configuredURL || isLocalURL(configuredURL))) {
    return getLocalDevelopmentServerURL()
  }

  return (
    configuredURL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}
