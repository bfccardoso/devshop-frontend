import React from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import { useMutation, useQuery } from '../../lib/graphql.js'
import Table from '../../components/layout/table/index.js'
import Link from 'next/link.js'
import Button from '../../components/button/index.js'
import Alert from '../../components/alert/index.js'

const DELETE_USER = `
mutation deleteUser($id: String!){
  panelDeleteUser (id: $id)
}
`

const GET_ALL_USERS = `
  query{
      panelGetAllUsers{
      id
      name
      email
      role
    }
  }
`

const Index = () => {
  const { data, mutate } = useQuery(GET_ALL_USERS)
  const [deleteData, deleteUser] = useMutation(DELETE_USER)
  const remove = id => async () => {
    await deleteUser({ id })
    mutate()
  }
  return (
    <Layout>
      <Title>Gerenciar usuários</Title>
      <div className='mt-8'></div>
      <div>
        <Button.Link href='/users/create'>Criar usuário</Button.Link>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data &&
            data.panelGetAllUsers &&
            data.panelGetAllUsers.length === 0 && (
              <Alert>
                <p>Nenhum usuário criado até o momento.</p>
              </Alert>
            )}
          {data &&
            data.panelGetAllUsers &&
            data.panelGetAllUsers.length > 0 && (
              <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                <Table>
                  <Table.Head>
                    <Table.Th>Usuários</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Head>

                  <Table.Body>
                    {data &&
                      data.panelGetAllUsers &&
                      data.panelGetAllUsers.map(item => {
                        return (
                          <Table.Tr key={item.id}>
                            <Table.Td>
                              <div className='flex items-center'>
                                <div>
                                  <div className='text-sm font-medium leading-5 text-gray-900'>
                                    {item.name}
                                  </div>
                                  <div className='text-sm leading-5 text-gray-500'>
                                    {item.email}
                                  </div>
                                </div>
                              </div>
                            </Table.Td>
                            <Table.Td>
                              <Link
                                className='text-indigo-600 hover:text-indigo-900'
                                href={`/users/${item.id}/edit`}
                              >
                                Edit
                              </Link>{' '}
                              |{' '}
                              <Link
                                className='text-indigo-600 hover:text-indigo-900'
                                href={`/users/${item.id}/sessions`}
                              >
                                Sessões
                              </Link>{' '}
                              |{' '}
                              <Link
                                className='text-indigo-600 hover:text-indigo-900'
                                href={`/users/${item.id}/passwd`}
                              >
                                Alterar senha
                              </Link>{' '}
                              |{' '}
                              <Link
                                href='#'
                                className='text-indigo-600 hover:text-indigo-900'
                                onClick={remove(item.id)}
                              >
                                Remove
                              </Link>
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
