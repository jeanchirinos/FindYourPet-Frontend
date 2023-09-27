import { Header } from 'app/(session)/components/Header/Header'
import NextTopLoader from 'nextjs-toploader'

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <>
      <NextTopLoader color='#FF813F' height={1.5} showSpinner={false} />
      <Header />
      <main className='pt-[var(--header-height)]'>{props.children}</main>
    </>
  )
}
