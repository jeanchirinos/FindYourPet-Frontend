import { IconBack, IconForward } from '@/icons'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { TGetPetParams, getPets } from '@/controllers/Pet'

type Props = { searchParams: TGetPetParams; page: string }

export async function Pagination(props: Props) {
  const { links } = await getPets(props.searchParams)

  if (links.length === 3) return null

  return (
    <div className='flex items-center justify-center gap-x-2'>
      {links[0].url !== null && (
        <LinkSearchParams
          aria-label='Anterior página'
          searchParamKey='page'
          searchParamValue={links[0].url.split('page=')[1]}
        >
          <IconBack />
        </LinkSearchParams>
      )}

      {links.slice(1, -1).map(link => {
        if (link.url === null) return null

        return (
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

      {links.at(-1)?.url !== null && (
        <LinkSearchParams
          aria-label='Siguiente página'
          searchParamKey='page'
          searchParamValue={links.at(-1)!.url!.split('page=')[1]}
        >
          <IconForward />
        </LinkSearchParams>
      )}
    </div>
  )
}
