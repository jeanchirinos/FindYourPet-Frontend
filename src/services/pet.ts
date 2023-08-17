'use client'

import { request } from '@/utilities'
import useSWR from 'swr'

interface Pet {
  id: number
}

async function getPets() {
  return request<Pet[]>('pets')
}

export function usePets() {
  const { data: pets, ...rest } = useSWR('pets', getPets)

  return {
    pets,
    ...rest,
  }
}
