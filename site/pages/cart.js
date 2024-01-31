import Seo from '../components/Seo'
import Layout from '../components/Layout'
import { fetcher, useQuery } from '../lib/graphql'
import { gql } from 'graphql-request'
import Brands from '../components/Home/Brands'
import { useCart } from '../lib/cartContext'
import priceFormat from '../lib/priceUtils'

const GET_ALL_BRANDS = gql`
  query {
    brands: getAllBrands {
      id
      name
      slug
      logo
    }
  }
`

const GET_ALL_CATEGORIES = gql`
  query {
    categories: getAllCategories {
      id
      name
      slug
    }
  }
`

const Cart = ({ brands, categories }) => {
  const cart = useCart()
  return (
    <>
      <Layout categories={categories}>
        <Seo />
        <div className='h-screen bg-gray-100 pt-20 overflow-y-auto'>
          <h1 className='mb-10 text-center text-2xl font-bold'>
            Itens do carrinho
          </h1>
          {cart.size > 0 && (
            <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
              <div className='rounded-lg md:w-2/3'>
                {Object.keys(cart.items).map(itemKey => {
                  const product = cart.items[itemKey].product
                  const qtd = cart.items[itemKey].qtd
                  return Object.keys(qtd).map(key => {
                    return (
                      <div
                        key={key}
                        className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
                      >
                        <img
                          src={product.images[0]}
                          alt='product-image'
                          className='w-full rounded-lg sm:w-40'
                        />
                        <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                          <div className='mt-5 sm:mt-0'>
                            <span className='text-lg font-bold text-gray-900'>
                              {product.name}
                            </span>
                            <br />
                            {product.optionNames[0]}
                            {product.optionNames[0].length > 0 ? ': ' : ''}
                            {qtd[key].variation.optionName1}
                            {product.optionNames[1].length > 0 ? ' / ' : ''}
                            {product.optionNames[1]}
                            {product.optionNames[1].length > 0 ? ': ' : ''}
                            {qtd[key].variation.optionName2}
                            <p className='mt-1 text-xs text-gray-700'>
                              {Object.keys(qtd[key].variation).length > 0
                                ? priceFormat(qtd[key].variation.price)
                                : priceFormat(product.price)}
                            </p>
                          </div>
                          <div className='mt-4 flex justify-between sm:mt-0 sm:block'>
                            <div className='flex items-center border-gray-100'>
                              <span
                                onClick={() => cart.changeQtd(product, key, -1)}
                                className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
                              >
                                {' '}
                                -{' '}
                              </span>
                              <input
                                className='h-8 w-8 border bg-white text-center text-xs outline-none'
                                value={qtd[key].qtd}
                              />
                              <span
                                onClick={() => cart.changeQtd(product, key, 1)}
                                className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
                              >
                                {' '}
                                +{' '}
                              </span>
                            </div>
                            <div className='items-center mt-1 md:ml-1.5'>
                              <p className='text-sm md:ml-3.5'>
                                {Object.keys(qtd[key].variation).length > 0
                                  ? priceFormat(
                                      qtd[key].variation.price * qtd[key].qtd
                                    )
                                  : priceFormat(product.price * qtd[key].qtd)}
                              </p>
                              <button
                                onClick={() => {
                                  //cart.removeFromCart({ id: product.id })
                                  cart.removeVariationFromCart(product, key)
                                }}
                                type='button'
                                className='text-sm px-1 rounded text-gray-700 hover:bg-red-500 hover:text-white'
                              >
                                Remover item
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                })}
              </div>
              {/* <!-- Sub total --> */}
              <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
                <div className='mb-2 flex justify-between'>
                  <p className='text-gray-700'>Subtotal</p>
                  <p className='text-gray-700'>{priceFormat(cart.cartTotal)}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-gray-700'>Frete</p>
                  <p className='text-gray-700'>Grátis</p>
                </div>
                <hr className='my-4' />
                <div className='flex justify-between'>
                  <p className='text-lg font-bold'>Total</p>
                  <div className=''>
                    <p className='mb-1 text-lg font-bold'>
                      {priceFormat(cart.cartTotal)}
                    </p>
                    <p className='text-sm text-gray-700'>incluindo frete</p>
                  </div>
                </div>
                <button className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
                  Fechar pedido
                </button>
              </div>
            </div>
          )}
          {cart.size === 0 && (
            <section className='py-4 bg-neutral-50 overflow-hidden'>
              <div className='container px-4 mx-auto'>
                <img
                  className='mx-auto'
                  src='dashy-assets/images/empty.png'
                  alt=''
                />
                <div className='max-w-md mx-auto text-center'>
                  <h2 className='font-heading mb-3 text-2xl font-semibold'>
                    It’s a bit empty here
                  </h2>
                  <p className='mb-7 text-neutral-500'>
                    Make sure to customize your timeline first and fill it with
                    eye-catching articles and products.
                  </p>
                  <a
                    className='inline-flex px-6 py-2.5 text-sm text-neutral-50 font-medium bg-gradient-purple-left hover:bg-gradient-purple-left-dark rounded-lg transition duration-300'
                    href='#'
                  >
                    Add First Product
                  </a>
                </div>
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  )
}
export const getServerSideProps = async () => {
  // Fetch data from external API
  const { brands } = await fetcher(GET_ALL_BRANDS)
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  // Pass data to the page via props
  return { props: { brands, categories } }
}
export default Cart
