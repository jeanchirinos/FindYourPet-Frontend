// import { LinkSearchParams } from '@/components/LinkSearchParams'
// import { getCategories } from '@/controllers/Pet'

export async function FilterCategory(props: { category: string | undefined }) {
  // const categoriesList = await getCategories()

  return (
    <section>
      <p className='sticky top-0 bg-th-fg-1 font-semibold text-foreground-900'>Especie</p>

      {/* <div className='grid w-full grid-cols-2 gap-2'>
        {categoriesList.map(item => (
          <LinkSearchParams
            key={item.id}
            href={{
              category_id: item.id,
              page: 1,
            }}
            selectedValue={props.category}
            value={item.id}
            className='flex-col gap-y-0.5 rounded-md border border-foreground-300 p-1 text-center flex-center'
            classNames={{
              selected: 'bg-orange-100 text-orange-600',
              notSelected: 'hover:bg-foreground-100',
            }}
            toggle
            searchParamKey='category_id'
            keyToDelete='breed_id'
          >
            <div className='*:size-4' dangerouslySetInnerHTML={{ __html: item.image }} />
            <span>{item.name}</span>
          </LinkSearchParams>
        ))}
      </div> */}
    </section>
  )
}
