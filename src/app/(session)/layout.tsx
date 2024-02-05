import { Header } from '@/app/(session)/components/Header/Header'

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <div className='flex flex-col gap-y-10 pb-5 max-lg:min-h-screen'>
      <Header />
      {props.children}
    </div>
  )
}
