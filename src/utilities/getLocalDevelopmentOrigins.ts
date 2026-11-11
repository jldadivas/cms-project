import { networkInterfaces } from 'node:os'

const isPrivateIPv4 = (address: string): boolean => {
  const octets = address.split('.').map(Number)

  return (
    octets.length === 4 &&
    (octets[0] === 10 ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (octets[0] === 192 && octets[1] === 168))
  )
}

export const getLocalDevelopmentServerURL = (port = 3000): string => {
  const interfaces = Object.entries(networkInterfaces()).flatMap(([name, addresses]) =>
    (addresses ?? [])
      .filter(
        (address) =>
          address.family === 'IPv4' && !address.internal && isPrivateIPv4(address.address),
      )
      .map((address) => ({ name, address: address.address })),
  )

  const wifiAddress = interfaces.find(({ name }) => /wi-?fi|wlan|wireless/i.test(name))
  const address = wifiAddress ?? interfaces[0]

  return address ? `http://${address.address}:${port}` : `http://localhost:${port}`
}

export const getLocalDevelopmentOrigins = (port = 3000): string[] => {
  const localOrigins = ['http://localhost', 'http://127.0.0.1'].map(
    (origin) => `${origin}:${port}`,
  )

  const networkOrigins = Object.values(networkInterfaces())
    .flatMap((interfaces) => interfaces ?? [])
    .filter((address) => address.family === 'IPv4' && !address.internal)
    .map(({ address }) => `http://${address}:${port}`)

  return [...new Set([...localOrigins, ...networkOrigins])]
}
