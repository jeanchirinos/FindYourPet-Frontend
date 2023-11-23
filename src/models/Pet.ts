export type BreedsData = Record<
  string,
  {
    id: number
    name: string
    category_id: number
  }[]
>

export type PetPaginate = {
  current_page: number
  data: {
    id: number
    breed_id: number
    user_id: number
    image: string
    image_width: number
    image_height: number
    description: string
    city: string
    district: string
    location: string
    status: number
    status_name: string
    breed: {
      id: number
      name: string
      user: {
        id: number
        username: string
        image: string
      }
    }
  }[]
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
