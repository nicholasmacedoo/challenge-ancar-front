export function api(path: string, init?: RequestInit) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const url = new URL(path, baseUrl)

  return fetch(url, init)
}
