'use client'

import { IconMobileMenu } from '@/icons'
import { Button } from '@nextui-org/button'
import { useEffect, useRef, useState } from 'react'
import { HeaderLink } from './HeaderLink'
import { links } from './links'
import { twJoin, twMerge } from 'tailwind-merge'

export function MobileMenu() {
  const menuRef = useRef<HTMLDivElement>(null)

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  // const menuIsOpenRef = useRef(false)

  function toggleMenu() {
    // menuRef.current?.classList.toggle('invisible')
    // menuRef.current?.classList.toggle('opacity-0')
    // setMenuIsOpen(!menuIsOpen)
    // if(menuIsOpenRef.current) {
    //   menuRef.current?.blur()
    //   menuIsOpenRef.current = false
    //   // closeMenu()
    // }else{
    //   menuIsOpenRef.current = true
    //   menuRef.current?.focus()
    // }
    // setTimeout(() => {
    //   console.log(menuIsOpen)
    // }, 1000)

    menuRef.current?.focus()
  }

  // useEffect(() => {
  //   if (menuIsOpen) {
  //     menuRef.current?.focus()
  //   }
  // }, [menuIsOpen])

  function closeMenu() {
    // menuRef.current?.classList.add('invisible')
    // menuRef.current?.classList.add('opacity-0')
    // setMenuIsOpen(false)
    // menuRef.current?.blur()
    document.getElementById('hey')?.focus()
  }

  return (
    <div className='flex-center md:hidden'>
      <button className='' id='hey'>
        A
      </button>
      {/* <Button
        size='sm'
        variant='light'
        className='min-w-fit pl-0'
        onClick={toggleMenu}
        // onBlur={e => {
        //   // e.stopPropagation()
        //   // console.log('blur')
        //   closeMenu()
        // }}
      > */}
      <button onClick={toggleMenu}>
        <IconMobileMenu size={32} />
      </button>
      {/* </Button> */}
      <div
        className={twMerge(
          'fixed left-0 top-header w-full scale-0 opacity-0 transition-all',
          // menuIsOpen && 'visible opacity-100',
          // 'focus:visible focus:opacity-100',
          'focus-within:scale-100 focus-within:opacity-100',
          'focus:scale-100 focus:opacity-100',
        )}
        ref={menuRef}
        onClick={closeMenu}
        tabIndex={0}
        // onBlur={() => console.log('blur')}
      >
        <div className='flex flex-col bg-background/70 *:px-2 *:py-3'>
          {links.map((link, idx) => (
            <HeaderLink key={link.href} id={`link_${idx}`} href={link.href}>
              {link.text}
            </HeaderLink>
          ))}
        </div>
      </div>
    </div>
  )
}
