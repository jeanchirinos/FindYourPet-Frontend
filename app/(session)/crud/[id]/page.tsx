import { PageProps } from '.next/types/app/layout'
import { Categories } from './Categories'
import { Breeds } from './Breeds'
import { redirect } from 'next/navigation'

export default function Page(props: PageProps) {
  const cruds = {
    especies: Categories,
    razas: Breeds,
  }

  const { id } = props.params

  if (!(id in cruds)) return redirect('/404')

  const CurrentCrud = cruds[id as keyof typeof cruds]

  return <CurrentCrud />
}
