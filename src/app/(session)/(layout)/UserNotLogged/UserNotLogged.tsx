'use client'
import { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Tabs, Tab } from '@nextui-org/react'
import { Google } from './Google'
import { Login } from './Login'
import { Register } from './Register'

export function UserNotLogged() {
  enum EFormState {
    Login = 'login',
    Register = 'register',
  }

  const [formState, setFormState] = useState(EFormState.Login)

  return (
    <Popover>
      <PopoverTrigger className='px-5 py-1'>Ingresa</PopoverTrigger>
      <PopoverContent className='right-0 flex w-80 flex-col gap-y-2 bg-content1 px-5 py-3 shadow-md'>
        <div className='max-w-sm space-y-2'>
          <Google />
          <Tabs fullWidth selectedKey={formState} onSelectionChange={setFormState as any}>
            <Tab key={EFormState.Login} title='Login'>
              <Login />
            </Tab>
            <Tab key={EFormState.Register} title='Registro'>
              <Register />
            </Tab>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
