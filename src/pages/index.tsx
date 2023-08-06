import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useSWR from 'swr'
import { Header } from '@/components/Header'
import { User } from '@/types'
import { getSession } from '@/services/user'

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session = props.session } = useSWR('session')

  return (
    <>
      <Header session={session} />
      <main className='mx-auto max-w-[1600px] py-12'>
        <p>
          Peity <b className='italic'>AI Pro + Ultra</b> está en construcción ... 🍊
        </p>
      </main>
    </>
  )
}

// SERVER SIDE PROPS
export const getServerSideProps: GetServerSideProps<{
  session: User
}> = async context => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
