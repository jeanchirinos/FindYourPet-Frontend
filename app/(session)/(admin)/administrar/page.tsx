'use client'
import { MyCombobox } from '@/components/Combobox'
import { useBreeds } from '@/services/breed'
import { useCategories } from '@/services/category'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  // Pagination,
} from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { mutate } from 'swr'
// import { useState, useMemo } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/DropdownNew'
// import { Dropdown, DropdownMenu, DropdownTrigger } from '@/components/Dropdown'
// import { Button } from '@/components/Button'

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
    // mutate(SWRKey.BREEDS)
    if (!selected?.id) return
    mutate(selected.id.toString())
  }, [selected])

  const { breeds } = useBreeds(selected?.id)

  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey]

    if (columnKey === 'name') {
      return cellValue
    } else if (columnKey === 'actions') {
      return (
        // <div className='relative flex items-center justify-end gap-2'>
        //   <Dropdown className='border-1 border-default-200 bg-background'>
        //     <DropdownTrigger>
        //       {/* <Button isIconOnly radius='full' size='sm' variant='light'> */}
        //       {/* <VerticalDotsIcon className="text-default-400" /> */}
        //       <HiOutlineDotsVertical />
        //       {/* </Button> */}
        //     </DropdownTrigger>
        //     <DropdownMenu>
        //       <DropdownItem>Editar</DropdownItem>
        //       <DropdownItem>Eliminar</DropdownItem>
        //     </DropdownMenu>
        //   </Dropdown>
        // </div>
        <Menu>
          <MenuButton>
            <HiOutlineDotsVertical />
          </MenuButton>
          <MenuItems>
            <MenuItem>
              <div>Editar</div>
            </MenuItem>
            <MenuItem>
              <div>Eliminar</div>
            </MenuItem>
          </MenuItems>
        </Menu>
      )
    } else {
      return cellValue
    }

    // switch (columnKey) {
    //   case 'name':
    //     return cellValue
    //   case 'role':
    //     return (
    //       <div className='flex flex-col'>
    //         <p className='text-bold text-small capitalize'>{cellValue}</p>
    //         <p className='text-bold text-tiny capitalize text-default-500'>{user.team}</p>
    //       </div>
    //     )
    //   case 'status':
    //     return (
    //       // <Chip
    //       //   className='gap-1 border-none capitalize text-default-600'
    //       //   color={statusColorMap[user.status]}
    //       //   size='sm'
    //       //   variant='dot'
    //       // >
    //       //   {cellValue}
    //       // </Chip>
    //       <></>
    //     )
    //   case 'actions':
    //     return (

    //     )
    //   default:
    //     return cellValue
    // }
  }, [])

  // RENDER
  return (
    <div className='flex min-h-screen flex-col items-center gap-y-10 py-20'>
      {/* <h1 className='text-center text-3xl font-black'>{categories?.name}</h1> */}
      <MyCombobox categories={categories} selected={selected} setSelected={setSelected} />
      <Table
        classNames={{
          wrapper: 'overflow-hidden',
        }}
        aria-label='Example table with client side pagination'
        className='relative mx-auto w-fit'
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
          <TableColumn key='actions'>Acciones</TableColumn>
        </TableHeader>
        <TableBody items={breeds?.breeds ?? []}>
          {item => (
            <TableRow key={item.name}>
              {/* {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>} */}
              {/* TODO: Headless ui */}
              {columnKey => (
                <TableCell>
                  {renderCell(item, columnKey)}
                  {/* <Dropdown
                    className='border-1 border-default-200 bg-background'
                    closeOnSelect={false}
                    shouldBlockScroll={false}
                  >
                    <DropdownTrigger>
                      <HiOutlineDotsVertical />
                    </DropdownTrigger>
                    <DropdownMenu className=''>
                      <DropdownItem>Editar</DropdownItem>
                      <DropdownItem>Eliminar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
