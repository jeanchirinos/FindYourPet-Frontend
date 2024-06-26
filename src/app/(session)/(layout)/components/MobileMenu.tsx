'use client'

import { IconMobileMenu } from '@/icons'
import { Button } from '@nextui-org/button'
import { HeaderLink } from './HeaderLink'
import { links } from './links'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/Menu'
import { Fragment } from 'react'

export function MobileMenu() {
  return (
    <div className='flex-center md:hidden'>
      <Menu className='static'>
        <MenuTrigger as={Fragment}>
          <Button size='sm' variant='light' isIconOnly className='pl-0 flex-center'>
            <IconMobileMenu size={32} />
          </Button>
        </MenuTrigger>
        <MenuContent className='left-0 top-0 -z-10 mt-0 w-full rounded-t-none bg-background/90 pt-header backdrop-blur-md focus:outline-none'>
          <div className='flex flex-col'>
            {links.map(link => (
              <MenuItem key={link.href} className='px-2 py-2.5'>
                <HeaderLink href={link.href}>{link.text}</HeaderLink>
              </MenuItem>
            ))}
          </div>
        </MenuContent>
      </Menu>
    </div>
  )
}
