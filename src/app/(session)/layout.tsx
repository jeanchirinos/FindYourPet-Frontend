import { Header } from './(layout)/Header'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <div className='flex flex-col gap-y-10 pb-5 max-lg:min-h-dvh'>
      <Header />
      {props.children}
    </div>
  )
}
