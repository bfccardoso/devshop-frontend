import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetcher, useMutation, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/layout'
import Title from '../../../components/layout/title'
import Input from '../../../components/input'
import Button from '../../../components/button'
import * as Yup from 'yup'

//Não deve ser feito, mas não sei como resolver
let id = ''

const UPDATE_CATEGORY = `
  mutation updateCategory($id: String!, $name: String!, $slug: String!){
    updateCategory (input: {
      id: $id,
      name: $name,
      slug: $slug
    }) {
      id
      name
      slug
    }
  }
`

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
    .required('Por favor, informe um nome.'),
  slug: Yup.string()
    .min(3, 'Por favor, informe pelo menos um slug com 3 caracteres.')
    .required('Por favor, informe um slug para a categoria.')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este já está em uso',
      async value => {
        const ret = await fetcher(JSON.stringify({
          query: `
            query{
              getCategoryBySlug(slug: "${value}"){
                id
              }
            }
          `
        }))
        if(ret.errors){
          return true
        }
        if(ret.data.getCategoryBySlug.id === id){
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
    getCategoryById(id: "${router.query.id}"){
      name,
      slug
    }
  }`)
  const [updatedData, updateCategory] = useMutation(UPDATE_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    onSubmit: async values => {
      const category = {
        ...values,
        id: router.query.id
      }
      const data = await updateCategory(category)
      if (data && !data.errors) {
        router.push('/categories')
      }
    },
    validationSchema: CategorySchema
  })
  // passou os dados para o formulário
  useEffect(() => {
    if (data && data.getCategoryById) {
      form.setFieldValue('name', data.getCategoryById.name)
      form.setFieldValue('slug', data.getCategoryById.slug)
    }
  }, [data])
  return (
    <Layout>
      <Title>Editar categoria</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/categories'}>Voltar</Button.LinkOutline>
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
                  label='Nome da categoria'
                  placeholder='Preencha com o nome da categoria'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                ></Input>
                <Input
                  label='Slug da categoria'
                  placeholder='Preencha com o slug da categoria'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  helpText='Slug é utilizado para URLs amigáveis.'
                  errorMessage={form.errors.slug}
                ></Input>
              </div>
              <Button>Salvar categoria</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Edit
