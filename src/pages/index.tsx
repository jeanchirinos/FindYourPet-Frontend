import { request } from '@/utilities'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useSWR from 'swr'
import { Header } from '@/components/Header'
import { User } from '@/types'

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data = props.user } = useSWR('session')

  return (
    <>
      <Header userSession={data} />
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
  user: User
}> = async context => {
  let user: User

  try {
    user = await request<User>('session', {}, context.req.headers.cookie)
  } catch (e) {
    user = {
      auth: false,
      status: 'success',
    }
  }

  return {
    props: {
      user,
    },
  }
}
