import { Header } from 'app/(session)/components/Header/Header'

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <div className='flex min-h-dvh pt-[calc(var(--header-height)+3rem)]'>{props.children}</div>
    </>
  )
}
