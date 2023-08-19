'use client'
import { MyCombobox } from '@/components/Combobox'
import { SWRKey } from '@/enums'
// import { Input } from '@/components/Input'
import { useBreeds } from '@/services/breed'
import { useCategories } from '@/services/category'

// export default function Page() {
//   const { categories } = useCategories()

//   return (
//     <>
//       {categories?.map(category => (
//         <div key={category.id}>
//           <h1>{category.name}</h1>
//         </div>
//       ))}
//     </>
//   )
// }

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  // Pagination,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { mutate } from 'swr'
// import { useState, useMemo } from 'react'

export default function Page() {
  // const [page, setPage] = useState(1)
  // const rowsPerPage = 4

  // const pages = Math.ceil(users.length / rowsPerPage)

  // const items = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage
  //   const end = start + rowsPerPage

  //   return users.slice(start, end)
  // }, [page, users])
  const { categories = [] } = useCategories()

  const [selected, setSelected] = useState(categories[0])

  useEffect(() => {
    setSelected(categories[0])
  }, [categories])

  useEffect(() => {
    mutate(SWRKey.BREEDS)
  }, [selected])

  const { breeds } = useBreeds(selected?.id)

  return (
    <div className='flex min-h-screen flex-col items-center gap-y-10 py-20'>
      {/* <h1 className='text-center text-3xl font-black'>{categories?.name}</h1> */}
      <MyCombobox categories={categories} selected={selected} setSelected={setSelected} />
      <Table
        aria-label='Example table with client side pagination'
        className='mx-auto w-fit'
        // bottomContent={
        //   <div className='flex w-full justify-center'>
        //     <Pagination
        //       isCompact
        //       showControls
        //       showShadow
        //       color='secondary'
        //       page={page}
        //       total={pages}
        //       onChange={page => setPage(page)}
        //     />
        //   </div>
        // }
      >
        <TableHeader>
          <TableColumn key='name'>Nombre</TableColumn>
          <TableColumn key='name'>Acciones</TableColumn>
        </TableHeader>
        <TableBody items={breeds?.breeds ?? []}>
          {item => (
            <TableRow key={item.name}>
              {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
