import Seo from '../components/Seo'
import Layout from '../components/Layout'
import { fetcher, useQuery } from '../lib/graphql'
import { gql } from 'graphql-request'
import Brands from '../components/Home/Brands'
import { useCart } from '../lib/cartContext'

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

const Index = ({ brands, categories }) => {
  const cart = useCart()
  return (
    <>
      <Layout categories={categories}>
        <Seo />
        <h1>DevShop</h1>
        <Brands brands={brands} />
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
export default Index
