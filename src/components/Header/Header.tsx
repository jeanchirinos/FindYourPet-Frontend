import { Session } from '@/types'
import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'
import Image from 'next/image'
import Logo from '@/public/img/logo.webp'

// MAIN COMPONENT
export function Header(props: { session: Session }) {
  const { session } = props

  return (
    <header className='mx-auto flex w-[1600px] max-w-full justify-between px-1.5'>
      <Image src={Logo} alt='Logo' width={40} />
      {session.auth ? <UserLogged session={session} /> : <UserNotLogged />}
    </header>
  )
}
