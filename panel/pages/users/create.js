import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import { fetcher, useMutation, useQuery } from '../../lib/graphql.js'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/button/index.js'
import Input from '../../components/input/index.js'
import * as Yup from 'yup'

const CREATE_USER = `
  mutation createUser($name: String!, $email: String!, $passwd: String!, $role: String!){
    panelCreateUser (input: {
      name: $name,
      email: $email,
      passwd: $passwd,
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
        return false
      }
    ),
    passwd: Yup.string()
      .min(3, 'Por favor, informe pelo menos uma senha com 3 caracteres.')
      .required('Por favor, informe uma senha.'),
    role: Yup.string()
      .min(3, 'Por favor, informe pelo menos um role com 3 caracteres.')
      .required('Por favor, informe um role.'),
})

const Index = () => {
  const router = useRouter()
  const [data, createUser] = useMutation(CREATE_USER)
  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      passwd: '',
      role: ''
    },
    validationSchema: UserSchema,
    onSubmit: async values => {
      console.log(JSON.stringify(values))
      const data = await createUser(values)
      if (data && !data.errors) {
        router.push('/users')
      }
    }
  })
  return (
    <Layout>
      <Title>Criar novo usuário</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/users'}>Voltar</Button.LinkOutline>
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
                  label='Senha do usuário'
                  placeholder='Preencha com a senha do usuário'
                  value={form.values.passwd}
                  onChange={form.handleChange}
                  name='passwd'
                  errorMessage={form.errors.passwd}
                ></Input>
                <Input
                  label='Role do usuário'
                  placeholder='Preencha com o role do usuário'
                  value={form.values.role}
                  onChange={form.handleChange}
                  name='role'
                  errorMessage={form.errors.role}
                  helpText='Role é utilizado para identificar o tipo de usuário.'
                ></Input>
              </div>
              <Button>Criar usuário</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Index
