import { User } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = props
  const router = useRouter()

  useEffect(() => {
    // Open only if it was opened by the app
    if (!window.opener) return router.replace('/')

    window.opener.postMessage(query, window.location.origin)
  }, [router, query])

  return <></>
}

type Query = User & { auth: string }

export const getServerSideProps: GetServerSideProps<{ query: Query }> = async context => {
  return {
    props: {
      query: context.query as Query,
    },
  }
}
