import Link from 'next/link'

const Brands = ({ brands }) => {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
          <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
            Nossas marcas
          </h1>
          <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
            As melhores marcas você encontra no DevShop.
          </p>
        </div>
        <div className='flex flex-wrap -m-4'>
          {brands.map((brand, key) => {
            return (
              <div key={key} className='lg:w-1/3 sm:w-1/2 p-4'>
                <div className='flex relative h-48'>
                  <Link
                    className='block inset-0 w-full h-full'
                    href={'/marca/' + brand.slug}
                  >
                    {brand.logo && (
                      <img
                        alt='gallery'
                        className='absolute inset-0 w-full h-full object-cover object-center'
                        src={brand.logo}
                      />
                    )}
                    {!brand.logo && (
                      <img src='https://dummyimage.com/420x260' />
                    )}
                    <div className='px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 h-full transition-all ease-in-out'>
                      <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
                        {brand.name}
                      </h1>
                      <p className='font-normal text-gray-500 mb-3'>
                        {brand.slug}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Brands
