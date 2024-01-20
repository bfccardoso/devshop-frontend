import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import { useMutation, useQuery } from '../../lib/graphql.js'
import Table from '../../components/layout/table/index.js'
import Link from 'next/link.js'
import Button from '../../components/button/index.js'
import Alert from '../../components/alert/index.js'

const DELETE_PRODUCTS = `
mutation deleteProduct($id: String!){
  panelDeleteProduct (id: $id)
}
`

const GET_ALL_PRODUCTS = `
  query{
      getAllProducts{
      id
      name
      slug
      description
    }
  }
`

const Index = () => {
  const { data, mutate } = useQuery(GET_ALL_PRODUCTS)
  const [deleteData, deleteProduct] = useMutation(DELETE_PRODUCTS)
  const remove = id => async () => {
    await deleteProduct({ id })
    mutate()
  }
  return (
    <Layout>
      <Title>Gerenciar produtos</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/products/create'>Criar produto</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data &&
            data.getAllProducts &&
            data.getAllProducts.length === 0 && (
              <Alert>
                <p>Nenhum produto criado até o momento.</p>
              </Alert>
            )}
          {data &&
            data.getAllProducts &&
            data.getAllProducts.length > 0 && (
              <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                <Table>
                  <Table.Head>
                    <Table.Th>Produtos</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Head>

                  <Table.Body>
                    {data &&
                      data.getAllProducts &&
                      data.getAllProducts.map(item => {
                        return (
                          <Table.Tr key={item.id}>
                            <Table.Td>
                              <div className='flex items-center'>
                                <div>
                                  <div className='text-sm font-medium leading-5 text-gray-900'>
                                    {item.name}
                                  </div>
                                  <div className='text-sm leading-5 text-gray-500'>
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            </Table.Td>
                            <Table.Td>
                              <Link
                                className='text-indigo-600 hover:text-indigo-900'
                                href={`/products/${item.id}/images`}
                              >
                                Imagens
                              </Link>{' '}
                              |{' '}
                              <Link
                                className='text-indigo-600 hover:text-indigo-900'
                                href={`/products/${item.id}/edit`}
                              >
                                Edit
                              </Link>{' '}
                              |{' '}
                              <a
                                href='#'
                                className='text-indigo-600 hover:text-indigo-900'
                                onClick={remove(item.id)}
                              >
                                Remove
                              </a>
                            </Table.Td>
                          </Table.Tr>
                        )
                      })}
                  </Table.Body>
                </Table>
              </div>
            )}
        </div>
      </div>
    </Layout>
  )
}
export default Index
