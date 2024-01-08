import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetcher, useMutation, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/layout'
import Title from '../../../components/layout/title'
import Input from '../../../components/input'
import Button from '../../../components/button'
import Select from '../../../components/select'
import * as Yup from 'yup'

//Não deve ser feito, mas não sei como resolver
let id = null

const UPDATE_PRODUCT = `
  mutation updateProduct($id: String!, $name: String!, $slug: String!, $description: String!, $category: String!){
    panelUpdateProduct (input: {
      id: $id,
      name: $name,
      slug: $slug,
      description: $description,
      category: $category
    }) {
      id
      name
      slug
      description
      category
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
        if (ret.data.getProductBySlug.id === id) {
          return true
        }
        return false
      }
    )
})

const Edit = () => {
  const router = useRouter()
  id = router.query.id
  const { data } = useQuery(`
    query{
    getProductById(id: "${router.query.id}"){
      name,
      slug,
      description,
      category
    }
  }`)
  const { data: categories, mutate } = useQuery(GET_ALL_CATEGORIES)
  const [updatedData, updateProduct] = useMutation(UPDATE_PRODUCT)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: ''
    },
    onSubmit: async values => {
      const product = {
        ...values,
        id: router.query.id
      }
      const data = await updateProduct(product)
      if (data && !data.errors) {
        router.push('/products')
      }
    },
    validationSchema: ProductSchema
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

  // passou os dados para o formulário
  useEffect(() => {
    if (data && data.getProductById) {
      form.setFieldValue('name', data.getProductById.name)
      form.setFieldValue('slug', data.getProductById.slug)
      form.setFieldValue('description', data.getProductById.description)
      form.setFieldValue('category', data.getProductById.category)
    }
  }, [data])
  return (
    <Layout>
      <Title>Editar produto</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/products'}>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 bg-white shadow sm:rounded-lg p-12'>
            {updatedData && !!updatedData.errors && (
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
                  errorMessage={form.errors.slug}
                  helpText='Slug é utilizado para URLs amigáveis.'
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
              <Button>Salvar produto</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Edit
