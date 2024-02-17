'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Tabs, Tab } from '@nextui-org/tabs'
import { Google } from './Google'
import { Login } from './Login'
import { Register } from './Register'

export function UserNotLogged() {
  return (
    <Popover>
      <PopoverTrigger className='px-2.5 py-1'>Ingresa</PopoverTrigger>
      <PopoverContent className='right-0 flex w-80 flex-col gap-y-2 bg-content1 px-5 py-3 shadow-md'>
        <div className='max-w-sm space-y-2'>
          <Google />
          <Tabs fullWidth>
            <Tab key='login' title='Login'>
              <Login />
            </Tab>
            <Tab key='register' title='Registro'>
              <Register />
            </Tab>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
