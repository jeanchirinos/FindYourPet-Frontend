export default function Page() {
  return (
    <main className='h-[150vh] pt-[50px]'>
      <section className='mt-5 flex w-full justify-center'>
        <div className='w-[800px] max-w-full'>
          <div className='flex'>
            <div className='relative w-fit rounded-t-lg border border-[#822527] p-2 text-left before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-full before:bg-[#fff1dc]'>
              <button className='px-2 focus:border-b focus:border-[#8E3B2A]'>Se busca</button>
              <button className='px-2 focus:border-b focus:border-[#C4744E]'>En la calle</button>
              <button className='px-2 focus:border-b focus:border-[#DCB672]'>En adopción</button>
            </div>
          </div>
          <div className='flex gap-3 rounded-lg rounded-tl-none border border-[#822527] p-2 text-left'>
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
    </main>
  )
}
