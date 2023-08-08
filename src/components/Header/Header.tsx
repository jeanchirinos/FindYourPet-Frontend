import { User } from '@/types'
import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'

// MAIN COMPONENT
export function Header(props: { session: User }) {
  const { session } = props

  return (
    <header className='mx-auto flex w-[1600px] max-w-full justify-between px-1.5'>
      <h2>Logo</h2>
      {session.auth ? <UserLogged session={session} /> : <UserNotLogged />}
    </header>
  )
}
