import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import Card from '../../components/layout/card/index.js'
import { useMutation, useQuery } from '../../lib/graphql.js'
import Table from '../../components/layout/table/index.js'
import Link from 'next/link.js'
import Button from '../../components/button/index.js'
import Alert from '../../components/alert/index.js'

const DELETE_BRAND = `
mutation deleteBrand($id: String!){
  deleteBrand (id: $id)
}
`

const REMOVE_BRAND_LOGO = `
mutation removeBrandLogo($id: String!){
  removeBrandLogo (id: $id)
}
`

const GET_ALL_BRANDS = `
  query{
      getAllBrands{
      id
      name
      slug
      logo
    }
  }
`

const Index = () => {
  const { data, mutate } = useQuery(GET_ALL_BRANDS)
  const [deleteData, deleteBrand] = useMutation(DELETE_BRAND)
  const [deleteBrandLogoData, deleteBrandLogo] = useMutation(REMOVE_BRAND_LOGO)
  const remove = id => async () => {
    await deleteBrand({ id })
    mutate()
  }
  const removeBrandLogo = id => async () => {
    await deleteBrandLogo({ id })
    mutate()
  }
  return (
    <Layout>
      <Title>Gerenciar Marcas</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/brands/create'>Criar marca</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllBrands && data.getAllBrands.length === 0 && (
            <Alert>
              <p>Nenhuma marca criada até o momento.</p>
            </Alert>
          )}
          {data && data.getAllBrands && data.getAllBrands.length > 0 && (
            <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
              <Table>
                <Table.Head>
                  <Table.Th>Marcas</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>

                <Table.Body>
                  {data &&
                    data.getAllBrands &&
                    data.getAllBrands.map(item => {
                      return (
                        <Table.Tr key={item.id}>
                          <Table.Td>
                            {item.logo && (
                              <img
                                src={item.logo}
                                alt={item.name}
                                className='h-20'
                              />
                            )}
                          </Table.Td>
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
                            {item.logo && (
                              <>
                                <Link
                                  href='#'
                                  className='text-indigo-600 hover:text-indigo-900'
                                  onClick={removeBrandLogo(item.id)}
                                >
                                  Remove logo
                                </Link>{' '}
                                |{' '}
                              </>
                            )}
                            <Link
                              className='text-indigo-600 hover:text-indigo-900'
                              href={`/brands/${item.id}/upload`}
                            >
                              Upload logo
                            </Link>{' '}
                            |{' '}
                            <Link
                              className='text-indigo-600 hover:text-indigo-900'
                              href={`/brands/${item.id}/edit`}
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
