import { Breed } from './Breed'
import { Category } from './Category'
import { User } from './User'

export type StatusList = { id: 1 | 2 | 3; value: string }[]

type PetBase = {
  id: number
  breed_id: string
  user_id: string
  image: string
  description: string | null
  estate: string
  city: string
  district: string
  location: string | null
  status: '1' | '2' | '3'
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
