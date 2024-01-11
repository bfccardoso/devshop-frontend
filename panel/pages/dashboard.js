import React from 'react'
import Layout from '../components/layout'
import Title from '../components/layout/title'
import Card from '../components/layout/card'
import { MdHome } from 'react-icons/md'
import Table from '../components/layout/table/'
const Dashboard = () => {
  return (
    <Layout>
      <Title>DevShop Painel de Controle</Title>
      <div className='mt-4'>
        <div className='flex flex-wrap -mx-6'>
          <Card>
            <Card.Icon>
              <MdHome className='w-8 h-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Produto</Card.Description>
            </Card.Data>
          </Card>

          <Card>
            <Card.Icon>
              <MdHome className='w-8 h-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Produto</Card.Description>
            </Card.Data>
          </Card>

          <Card>
            <Card.Icon>
              <MdHome className='w-8 h-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Produto</Card.Description>
            </Card.Data>
          </Card>
        </div>
      </div>

      <div className='mt-8'></div>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
            <Table>
              <Table.Head>
                <Table.Th>Nome</Table.Th>
                <Table.Th>Título</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th></Table.Th>
              </Table.Head>

              <Table.Body>
                <Table.Tr>
                  <Table.Td>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 w-10 h-10'>
                        <img
                          className='w-10 h-10 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                          alt=''
                        />
                      </div>

                      <div className='ml-4'>
                        <div className='text-sm font-medium leading-5 text-gray-900'>
                          John Doe
                        </div>
                        <div className='text-sm leading-5 text-gray-500'>
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <div className='text-sm leading-5 text-gray-900'>
                      Software Engineer
                    </div>
                    <div className='text-sm leading-5 text-gray-500'>
                      Web dev
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
                      Active
                    </span>
                  </Table.Td>
                  {/* className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200" */}
                  <Table.Td>Owner</Table.Td>
                  {/* className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200" */}
                  <Table.Td>
                    <a
                      href='#'
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      Edit
                    </a>
                  </Table.Td>
                </Table.Tr>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Dashboard
