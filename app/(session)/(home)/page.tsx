import { requestActionData } from '@/utilities/actionsRequest'
import { Pets } from './pets'

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

async function getPets() {
  const response = await requestActionData<Pet[]>('pet')

  if (response.status === 'error') return []

  return response.data
}

export default async function Page() {
  const pets = await getPets()

  return (
    <main className='animate-fade px-2 pb-2 animate-duration-200'>
      <section className='mb-10 mt-5 flex w-full justify-center'>
        <div className='w-[800px] max-w-full'>
          <div className='flex'>
            <div className='relative w-fit rounded-t-lg border border-[#822527] p-2 text-left before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-full before:bg-white'>
              <button className='px-2 focus:border-b focus:border-[#8E3B2A]'>Se busca</button>
              <button className='px-2 focus:border-b focus:border-[#C4744E]'>En la calle</button>
              <button className='px-2 focus:border-b focus:border-[#DCB672]'>En adopción</button>
            </div>
          </div>
          <div className='flex flex-wrap gap-3 rounded-lg rounded-tl-none border border-[#822527] p-2 text-left'>
            <select name='' id='' className='rounded-xl border border-[#444041] px-3 py-2'>
              <option value='1'>Especie</option>
            </select>
            <input
              type='search'
              placeholder='Buscar'
              className='grow rounded-xl border border-[#444041] px-3 py-1'
            />
            <button className='rounded-md border-2 border-black bg-[#822527] px-3 py-2 text-white'>
              Buscar
            </button>
          </div>
        </div>
      </section>

      <Pets pets={pets} />
    </main>
  )
}

/* <section className='templateColumns-[250px] mx-auto mt-10 grid w-[1600px] max-w-full gap-5'>
        {cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </section> */
