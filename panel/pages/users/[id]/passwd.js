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

const CHANGE_PASSWD = `
  mutation changeUserPass($id: String!, $passwd: String!){
    panelChangeUserPass (input: {
      id: $id,
      passwd: $passwd
    })
  }
`

const PasswordSchema = Yup.object().shape({
  passwd: Yup.string()
    .min(3, 'Por favor, informe pelo menos uma nova senha com 3 caracteres.')
    .required('Por favor, informe uma nova senha.')
})

const ChangePassword = () => {
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
  const [updatedData, updatePass] = useMutation(CHANGE_PASSWD)
  const form = useFormik({
    initialValues: {
      passwd: ''
    },
    onSubmit: async values => {
      const user = {
        ...values,
        id: router.query.id
      }
      const data = await updatePass(user)
      if (data && !data.errors) {
        router.push('/users')
      }
    },
    validationSchema: PasswordSchema
  })
  return (
    <Layout>
      <Title>Editar senha: {data && data.panelGetUserById && data.panelGetUserById.name}</Title>
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
                  label='Nova senha'
                  placeholder='Preencha com a senha'
                  value={form.values.passwd}
                  onChange={form.handleChange}
                  name='passwd'
                  errorMessage={form.errors.passwd}
                ></Input>
              </div>
              <Button>Salvar nova senha</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ChangePassword
