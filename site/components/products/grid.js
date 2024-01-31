import Link from 'next/link'
import priceFormat from '../../lib/priceUtils'

const Grid = ({product: product}) => {
  return (
    <div className='lg:w-1/4 md:w-1/2 p-4 w-full'>
      <a className='block relative h-48 rounded overflow-hidden'>
        {product.images && product.images.length > 0 ? (
          <img
            alt={`ecommerce ${product.id}`}
            className='object-cover object-center w-full h-full block'
            src={product.images[0]}
          />
        ) : (
          <img alt='placeholder' src='https://dummyimage.com/420x260' />
        )}
      </a>
      <div className='mt-4'>
        <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
          CATEGORY
        </h3>
        <h2 className='text-gray-900 title-font text-lg font-medium'>
          <Link href={`/produto/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className='mt-1'>
          {priceFormat(product.price)}
        </p>
      </div>
    </div>
  )
}

export default Grid
