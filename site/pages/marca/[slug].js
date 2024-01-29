import { gql } from 'graphql-request'
import { fetcher } from '../../lib/graphql'
import Layout from '../../components/Layout'
import Grid from '../../components/products/grid'

const GET_ALL_PRODUCTS_BY_BRAND = gql`
  query getAllProductsByBrand($slug: String!) {
    products: getAllProductsByBrand(brandSlug: $slug) {
      id
      name
      slug
      price
      images
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

const Brand = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {products.map(product => {
              return (
                <Grid key={product.id} product={product} />
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = async context => {
  const { products } = await fetcher(GET_ALL_PRODUCTS_BY_BRAND, {
    slug: context.query.slug
  })
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  return {
    props: {
      products,
      categories
    }
  }
}

export default Brand
