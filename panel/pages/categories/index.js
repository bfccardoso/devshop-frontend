import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import Card from '../../components/layout/card/index.js'
import { useMutation, useQuery } from '../../lib/graphql.js'
import Table from '../../components/layout/table/index.js'
import Link from 'next/link.js'
import Button from '../../components/button/index.js'
import Alert from '../../components/alert/index.js'

const DELETE_CATEGORY = `
mutation deleteCategory($id: String!){
  panelDeleteCategory (id: $id)
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

const Index = () => {
  const { data, mutate } = useQuery(GET_ALL_CATEGORIES)
  const [deleteData, deleteCategory] = useMutation(DELETE_CATEGORY)
  const remove = id => async () => {
    await deleteCategory({ id })
    mutate()
  }
  return (
    <Layout>
      <Title>Gerenciar categorias</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/categories/create'>Criar categoria</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data &&
            data.getAllCategories &&
            data.getAllCategories.length === 0 && (
              <Alert>
                <p>Nenhuma categoria criada até o momento.</p>
              </Alert>
            )}
          {data &&
            data.getAllCategories &&
            data.getAllCategories.length > 0 && (
              <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                <Table>
                  <Table.Head>
                    <Table.Th>Categorias</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Head>

                  <Table.Body>
                    {data &&
                      data.getAllCategories &&
                      data.getAllCategories.map(item => {
                        return (
                          <Table.Tr key={item.id}>
                            <Table.Td>
                              <div className='flex items-center'>
                                <div>
                                  <div className='text-sm font-medium leading-5 text-gray-900'>
                                    {item.name}
                                  </div>
                                  <div className='text-sm leading-5 text-gray-500'>
                                    {item.slug}
                                  </div>
                                </div>
                              </div>
                            </Table.Td>
                            <Table.Td>
                              <Link
                                className='text-indigo-600 hover:text-indigo-900'
                                href={`/categories/${item.id}/edit`}
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
