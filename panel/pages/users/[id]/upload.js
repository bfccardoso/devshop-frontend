import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetcher, useUpload, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/layout'
import Title from '../../../components/layout/title'
import Input from '../../../components/input'
import Button from '../../../components/button'
import * as Yup from 'yup'

//Não deve ser feito, mas não sei como resolver
let id = ''

const UPLOAD_USER_PICTURE = `
    mutation uploadUserPicture($id: String!, $file: Upload!) {
      panelUploadUserPicture (
        id: $id,
        file: $file
      )
    }
`

const Upload = () => {
  const router = useRouter()
  const { data } = useQuery(`
    query{
    getBrandById(id: "${router.query.id}"){
      name,
      slug
    }
  }`)
  const [updatedData, updateUser] = useUpload(UPLOAD_USER_PICTURE)
  const form = useFormik({
    initialValues: {
      id: router.query.id,
      file: ''
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
    }
  })

  return (
    <Layout>
      <Title>
        Upload foto de perfil: {data && data.getUserId && data.getUserId.name}
      </Title>
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
                <input
                  type='file'
                  name='file'
                  onChange={evt => {
                    form.setFieldValue('file', evt.currentTarget.files[0])
                  }}
                />
              </div>
              <Button>Salvar usuário</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Upload
