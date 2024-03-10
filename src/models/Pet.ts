import { Breed } from './Breed'
import { Category } from './Category'
import { User } from './User'

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
