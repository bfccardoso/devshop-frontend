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

const UPDATE_USER = `
  mutation updateUser($id: String!, $name: String!, $email: String!, $role: String!){
    panelUpdateUser (input: {
      id: $id,
      name: $name,
      email: $email,
      role: $role
    }) {
      id
      name
      email
      role
    }
  }
`

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
    .required('Por favor, informe um nome.'),
  email: Yup.string()
    .email()
    .min(3, 'Por favor, informe pelo menos um email com 3 caracteres.')
    .required('Por favor, informe um email para o usuário.')
    .test(
      'is-unique',
      'Por favor, utilize outro email. Este já está em uso',
      async value => {
        const ret = await fetcher(JSON.stringify({
          query: `
            query{
              panelGetUserByEmail(email: "${value}"){
                id
              }
            }
          `
        }))
        if(ret.errors){
          return true
        }
        if(ret.data.panelGetUserByEmail.id === id){
          return true
        }
        return false
      }
    ),
    role: Yup.string()
      .min(3, 'Por favor, informe pelo menos um role com 3 caracteres.')
      .required('Por favor, informe um role.'),
})

const Edit = () => {
  const router = useRouter()
  id = router.query.id
  const { data } = useQuery(`
    query{
    panelGetUserById(id: "${router.query.id}"){
      name,
      email,
      role
    }
  }`)
  const [updatedData, updateUser] = useMutation(UPDATE_USER)
  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: ''
    },
    onSubmit: async values => {
      const user = {
        ...values,
        id: router.query.id
      }
      const data = await updateUser(user)
      if (data && !data.errors) {
        router.push('/users')
      }
    },
    validationSchema: UserSchema
  })
  // passou os dados para o formulário
  useEffect(() => {
    if (data && data.panelGetUserById) {
      form.setFieldValue('name', data.panelGetUserById.name)
      form.setFieldValue('email', data.panelGetUserById.email)
      form.setFieldValue('role', data.panelGetUserById.role)
    }
  }, [data])
  return (
    <Layout>
      <Title>Editar usuário</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/users'}>Voltar</Button.LinkOutline>
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
                  label='Nome do usuário'
                  placeholder='Preencha com o nome do usuário'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                ></Input>
                <Input
                  label='Email do usuário'
                  placeholder='Preencha com o email do usuário'
                  value={form.values.email}
                  onChange={form.handleChange}
                  name='email'
                  errorMessage={form.errors.email}
                ></Input>
                <Input
                  label='Role do usuário'
                  placeholder='Preencha com o role do usuário'
                  value={form.values.role}
                  onChange={form.handleChange}
                  name='role'
                  errorMessage={form.errors.role}
                ></Input>
              </div>
              <Button>Salvar usuário</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Edit
