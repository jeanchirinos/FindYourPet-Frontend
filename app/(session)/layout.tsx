import { Header } from 'app/(session)/components/Header/Header'

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <main className='pt-[var(--header-height)]'>{props.children}</main>
    </>
  )
}
