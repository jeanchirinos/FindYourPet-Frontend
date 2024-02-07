export type Breed = {
  id: number
  name: string
  category_id: number
}

export type BreedsData = Record<string, Breed[]>

export type Pet = {
  id: number
  breed_id: number
  user_id: null | number
  image: string
  image_width: number
  image_height: number
  description: string
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
  } | null
}

export type PetPaginate = {
  current_page: number
  data: Pet[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export type Category = {
  id: number
  name: string
  image: string
}

export type StatusList = { id: number; value: string }[]
