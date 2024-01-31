import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetcher, useUpload, useQuery, useMutation } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/layout'
import Title from '../../../components/layout/title'
import Input from '../../../components/input'
import Button from '../../../components/button'
import * as Yup from 'yup'
import Alert from '../../../components/alert'

//Não deve ser feito, mas não sei como resolver
let id = ''

const UPLOAD_PRODUCT_IMAGE = `
    mutation uploadProductImage($id: String!, $file: Upload!) {
      panelUploadProductImage (
        id: $id,
        file: $file
      )
    }
`

const DELETE_IMAGE = `
mutation deleteProductImage($id: String!, $url: String!){
  panelDeleteProductImage (id: $id, url: $url)
}
`

const Upload = ({id}) => {
  const [deleteData, deleteImage] = useMutation(DELETE_IMAGE)
  const { data, mutate } = useQuery(`
    query{
    getProductById(id: "${id}"){
      name,
      slug,
      images
    }
  }`)
  const [updatedData, uploadProductImage] = useUpload(UPLOAD_PRODUCT_IMAGE)
  const form = useFormik({
    initialValues: {
      id: id,
      file: ''
    },
    onSubmit: async values => {
      const product = {
        ...values,
        id: id
      }

      const data = await uploadProductImage(product)
      if (data && !data.errors) {
        mutate()
        // router.push('/products')
      }
    }
  })

  const delImage = async url => {
    await deleteImage({ id: id, url })
    mutate()
  }

  return (
    <Layout>
      <Title>
        Upload de imagens do produto:{' '}
        {data && data?.getProductById && data?.getProductById?.name}
      </Title>
      <div className='mt-8'></div>
      <div className='p-1 py-5'>
        <Button.LinkOutline href={'/products'}>Voltar</Button.LinkOutline>
      </div>
      {data &&
        data?.getProductById &&
        data?.getProductById?.images === null && (
          <Alert>Nenhuma imagem enviada até o momento</Alert>
        )}
      {data &&
        data?.getProductById &&
        data?.getProductById?.images !== null &&
        data?.getProductById?.images?.map(img => {
          return (
            <div
              key={img}
              className='p-2 m-1 border border-gray-500 rounded hover:bg-gray-300'
            >
              <img src={img} className='rounded' />
              <button
                className='bg-red-400 text-white font-bold p-2 rounded mt-1'
                onClick={() => delImage(img)}
              >
                Remover
              </button>
            </div>
          )
        })}
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
              <Button>Salvar imagem</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const UploadWrapper = () => {
  const router = useRouter()
  if(router.query.id){
    return <Upload id={router.query.id} />
  }
  return( <p>Loading...</p>)
}

export default UploadWrapper
