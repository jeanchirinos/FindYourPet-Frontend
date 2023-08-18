import { LuRat } from 'react-icons/lu'
import { GiRabbit } from 'react-icons/gi'

interface Props extends React.ComponentProps<'svg'> {
  name: string
}

export function Icon(props: Props) {
  const { name, ...rest } = props

  const Tag = icons[name as keyof typeof icons]

  return <Tag {...rest} />
}

const icons = {
  Rata: LuRat,
  Conejo: GiRabbit,
  Perro: GiRabbit,
}
