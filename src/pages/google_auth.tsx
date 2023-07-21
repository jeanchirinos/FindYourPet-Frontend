import { useRouter } from 'next/navigation'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { setCookie } from 'typescript-cookie'

interface Props {
  token: string
}

export default function GoogleAuth(props: Props) {
  const { token } = props
  const router = useRouter()

  useEffect(() => {
    if (!window.opener) return router.replace('/')

    // createCookie(token)
    setCookie('jwt', token, { expires: 7 })

    window.opener.postMessage({ token }, window.location.origin)
  }, [router, token])

  return <></>
}

// SERVER SIDE PROPS
export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.query.access_token as string

  return {
    props: {
      token,
    },
  }
}
