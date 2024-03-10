export type Breed = {
  id: number
  name: string
  // image: string,
  category_id: string
}

export type BreedsData = Record<string, Breed[]>
