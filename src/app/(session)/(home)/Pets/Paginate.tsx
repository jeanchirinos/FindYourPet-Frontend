import { IconBack, IconForward } from '@/icons'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { TGetPetParams, getPets } from '@/controllers/Pet'

type Props = { searchParams: TGetPetParams; page: string }

export async function Paginate(props: Props) {
  const { links } = await getPets(props.searchParams)

  return (
    <div className='flex items-center justify-center gap-x-2'>
      <IconBack />

      {links.slice(0, -1).map(link => {
        if (link.url === null) return null

        // const url = '?page=' + link.label

        return (
          // <Link
          //   href={url}
          //   key={link.label}
          //   className={twMerge(
          //     'rounded-lg bg-secondary px-3 py-0.5',
          //     link.active && 'bg-primary text-white',
          //   )}
          // >
          //   {link.label}
          // </Link>
          <LinkSearchParams
            key={link.label}
            searchParamKey='page'
            searchParamValue={link.label}
            currentParam={props.page}
            classNames={{
              selected: 'bg-orange-100 text-orange-600',
              notSelected: 'bg-transparent hover:bg-foreground-100',
            }}
          >
            {link.label}
          </LinkSearchParams>
        )
      })}

      <IconForward />
    </div>
  )
}
