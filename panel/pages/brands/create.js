import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import { fetcher, useMutation, useQuery } from '../../lib/graphql.js'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/button/index.js'
import Input from '../../components/input/index.js'
import * as Yup from 'yup'

const CREATE_BRAND = `
  mutation createBrand($name: String!, $slug: String!){
    createBrand (input: {
      name: $name,
      slug: $slug
    }) {
      id
      name
      slug
    }
  }
`

const BrandSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
    .required('Por favor, informe um nome.'),
  slug: Yup.string()
    .min(3, 'Por favor, informe pelo menos um slug com 3 caracteres.')
    .required('Por favor, informe um slug para a marca.')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este já está em uso',
      async value => {
        const ret = await fetcher(JSON.stringify({
          query: `
            query{
              getBrandBySlug(slug: "${value}"){
                id
              }
            }
          `
        }))
        if(ret.errors){
          return true
        }
        return false
      }
    )
})

const CreateBrand = () => {
  const router = useRouter()
  const [data, createBrand] = useMutation(CREATE_BRAND)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    validationSchema: BrandSchema,
    onSubmit: async values => {
      const data = await createBrand(values)
      if (data && !data.errors) {
        router.push('/brands')
      }
    }
  })
  return (
    <Layout>
      <Title>Criar nova marca</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/brands'}>Voltar</Button.LinkOutline>
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
                  label='Nome da marca'
                  placeholder='Preencha com o nome da marca'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                ></Input>
                <Input
                  label='Slug da marca'
                  placeholder='Preencha com o slug da marca'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  errorMessage={form.errors.slug}
                  helpText='Slug é utilizado para URLs amigáveis.'
                ></Input>
              </div>
              <Button>Criar marca</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CreateBrand
