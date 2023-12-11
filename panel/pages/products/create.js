import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import { fetcher, useMutation, useQuery } from '../../lib/graphql.js'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/button/index.js'
import Input from '../../components/input/index.js'
import Select from '../../components/select/index.js'
import * as Yup from 'yup'

const CREATE_PRODUCTS = `
  mutation createProduct($name: String!, $slug: String!, $description: String!, $category: String!){
    createProduct (input: {
      name: $name,
      slug: $slug,
      description: $description,
      category: $category
    }) {
      id
      name
      slug
      description
    }
  }
`

const GET_ALL_CATEGORIES = `
  query{
      getAllCategories{
      id
      name
      slug
    }
  }
`

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
    .required('Por favor, informe um nome.'),
  description: Yup.string()
    .min(20, 'Por favor, faça uma descrição com no mínimo 20 caracteres.')
    .required('Por favor, faça uma descrição.'),
  category: Yup.string()
    .min(1, 'Por favor, selecione uma categoria.')
    .required('Por favor, selecione uma categoria.'),
  slug: Yup.string()
    .min(3, 'Por favor, informe pelo menos um slug com 3 caracteres.')
    .required('Por favor, informe um slug para o produto.')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este já está em uso',
      async value => {
        const ret = await fetcher(
          JSON.stringify({
            query: `
            query{
              getProductBySlug(slug: "${value}"){
                id
              }
            }
          `
          })
        )
        if (ret.errors) {
          return true
        }
        return false
      }
    )
})

const Index = () => {
  const router = useRouter()
  const [data, createProduct] = useMutation(CREATE_PRODUCTS)
  const { data: categories, mutate } = useQuery(GET_ALL_CATEGORIES)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: ''
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const data = await createProduct(values)
      if (data && !data.errors) {
        router.push('/products')
      }
    }
  })

  // tratar os options
  let options = []
  if (categories && categories.getAllCategories) {
    options = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name
      }
    })
  }

  return (
    <Layout>
      <Title>Criar novo produto</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/products'}>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 bg-white shadow sm:rounded-lg p-12'>
            {data && !!data.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative'>
                Ocorreu um erro ao salvar os dados
              </p>
            )}
            <form onSubmit={form.handleSubmit}>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <Input
                  label='Nome do produto'
                  placeholder='Preencha com o nome do produto'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                ></Input>
                <Input
                  label='Slug do produto'
                  placeholder='Preencha com o slug do produto'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  helpText='Slug é utilizado para URLs amigáveis.'
                  errorMessage={form.errors.slug}
                ></Input>
                <Input
                  label='Descrição do produto'
                  placeholder='Preencha com a descrição do produto'
                  value={form.values.description}
                  onChange={form.handleChange}
                  name='description'
                  errorMessage={form.errors.description}
                ></Input>
                <Select
                  label='Selecione a categoria'
                  name='category'
                  onChange={form.handleChange}
                  value={form.values.category}
                  options={options}
                  errorMessage={form.errors.category}
                  initial={{ id: '', label: 'Selecione...' }}
                />
              </div>
              <Button>Criar produto</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Index
