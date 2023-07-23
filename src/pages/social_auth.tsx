import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SocialAuth() {
  const router = useRouter()

  useEffect(() => {
    if (!window.opener) return router.replace('/')

    window.opener.postMessage({ status: 'success' }, window.location.origin)
  }, [router])

  return <h1>Hola mundo</h1>
}
