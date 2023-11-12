export type Pet = {
  id: number
  breed_id: number
  user_id: number
  image: string
  description: string
  city: string
  district: string
  location: string
  status: number
  image_width: number
  image_height: number
  status_name: string
  breed: {
    id: number
    name: string
  }
  user: {
    id: number
    username: string
    image: string
  }
}
