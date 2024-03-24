import { Header } from './(layout)/components/Header'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <div className='flex min-h-dvh flex-col gap-y-10 pb-5'>
      <Header />
      {props.children}
    </div>
  )
}
