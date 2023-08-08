import { twMerge } from 'tailwind-merge'

interface Props extends React.ComponentProps<'input'> {
  label: string
}

export function Input(props: Props) {
  return (
    <label className='relative'>
      <input
        required
        {...props}
        className={twMerge(
          'peer block w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-gray-600 focus:outline-none',
          props.className,
        )}
        placeholder=''
      />
      <span className='pointer-events-none absolute left-2 top-4 w-max -translate-y-6 select-none bg-white px-1.5 text-xs text-gray-600 transition-all'>
        {props.label}
      </span>
    </label>
  )
}
