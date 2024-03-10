import { Breed } from './Breed'
import { User } from './User'

export type Peta = {
  id: number
  breed_id: number
  user_id: null | number
  description: string
  image: {
    image: string
    width: number
    height: number
  }
  city: string
  district: string
  location: string
  status: number
  status_name: string
  district_name: string
  breed: {
    id: number
    category_id: number
    name: string
    image: null
    created_at: string
    updated_at: string
    editable: number
    category: {
      id: number
      name: string
      image: string
    }
  }
  user: {
    id: number
    username: string
    image: string
  }
}

export type Category = {
  id: number
  name: string
  image: string
}

export type StatusList = { id: number; value: string }[]

type PetBase = {
  id: number
  breed_id: string
  user_id: string
  image: string
  description: string
  estate: string
  city: string
  district: string
  location: string
  status: string // '0' | '1' | '2'
  // plan: string
  // public_date: string
  // until_date: string
  published: '0' | '1'
}

export type Pet = PetBase & {
  user_id: string
  image: {
    image: string
    width: number
    height: number
  }
  status_name: string
  district_name: string
  breed: Breed & {
    category: Category
  }
  user: Pick<User, 'username' | 'image'> & {
    id: number
  }
  // user: User
}
