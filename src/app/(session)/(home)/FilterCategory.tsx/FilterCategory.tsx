import { getCategories } from '@/controllers/CategoryController/getCategories'
import { LinkSearchParams } from '@/components/LinkSearchParams'
import { twMerge } from 'tailwind-merge'
import { allCategoriesItem } from './allCategoriesItem'

export async function FilterCategory() {
  const categoriesList = await getCategories()

  return (
    <section>
      <p className='font-semibold text-foreground-900'>Especie</p>

      <div className='flex w-full flex-wrap justify-between gap-2'>
        {[allCategoriesItem, ...categoriesList].map(item => (
          <LinkSearchParams
            key={item.id}
            searchParamKey='category_id'
            searchParamValue={item.id}
            defaultParam={0}
            keysToDelete={['breed_id', 'page']}
            className='group flex h-fit min-w-fit cursor-pointer flex-col gap-y-0.5 rounded-none bg-transparent p-0'
          >
            <div
              className={twMerge(
                'rounded-md border border-foreground-300 p-1.5 text-center flex-center',
                'group-data-[selected]:bg-orange-100 group-data-[selected]:text-orange-600',
                'group-data-[not-selected]:hover:bg-foreground-100',
              )}
            >
              <div className='*:size-5' dangerouslySetInnerHTML={{ __html: item.image }} />
            </div>
            <span>{item.name}</span>
          </LinkSearchParams>
        ))}
      </div>
    </section>
  )
}
