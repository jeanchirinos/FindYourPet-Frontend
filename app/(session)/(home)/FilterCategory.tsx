import { LinkSearchParams } from '@/components/LinkSearchParams'
import { getCategories } from '@/controllers/Pet'

export async function FilterCategory(props: { category: string | undefined }) {
  const categoriesList = await getCategories()

  return (
    <section>
      <p className='sticky top-14 bg-th-fg-1 font-semibold text-foreground-900'>Especie</p>

      <div className='flex flex-col gap-y-2'>
        {categoriesList.map(item => (
          <LinkSearchParams
            key={item.id}
            href={{
              category_id: item.id,
              page: 1,
            }}
            selectedValue={props.category}
            value={item.id}
            className='flex w-full min-w-max cursor-pointer items-center rounded-lg px-2.5 py-1.5 text-sm shadow-md'
            classNames={{
              selected: 'bg-orange-100 text-orange-600',
              notSelected: 'hover:bg-foreground-100',
            }}
            toggle
            searchParamKey='category_id'
          >
            {item.name}
          </LinkSearchParams>
        ))}
      </div>
    </section>
  )
}
