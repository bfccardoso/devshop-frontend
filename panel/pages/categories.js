import React from 'react'
import Layout from '../components/layout'
import Title from '../components/layout/title'
import Card from '../components/layout/card'
const Index = () => {
  return (
    <Layout>
      <Title>Gerenciar categorias</Title>
      <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
              <Card>
                <Card.Icon>
                  <svg className="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor"
                      stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                    <path
                      d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                      stroke="currentColor" strokeWidth="2">
                    </path>
                  </svg>
                </Card.Icon>
                <Card.Data>
                  <Card.Title>2000</Card.Title>
                  <Card.Description>Produto</Card.Description>
                </Card.Data>
              </Card>
              
              <Card>
                <Card.Icon>
                  <svg className="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor"
                      stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                    <path
                      d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                      stroke="currentColor" strokeWidth="2">
                    </path>
                  </svg>
                </Card.Icon>
                <Card.Data>
                  <Card.Title>2000</Card.Title>
                  <Card.Description>Produto</Card.Description>
                </Card.Data>
              </Card>

              <Card>
                <Card.Icon>
                  <svg className="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor"
                      stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
                    <path
                      d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                      stroke="currentColor" strokeWidth="2">
                    </path>
                  </svg>
                </Card.Icon>
                <Card.Data>
                  <Card.Title>2000</Card.Title>
                  <Card.Description>Produto</Card.Description>
                </Card.Data>
              </Card>
          </div>
      </div>

      <div className="mt-8">

      </div>

      <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div
                  className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                      <thead>
                          <tr>
                              <th
                                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                  Name</th>
                              <th
                                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                  Title</th>
                              <th
                                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                  Status</th>
                              <th
                                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                  Role</th>
                              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                          </tr>
                      </thead>

                      <tbody className="bg-white">
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                          <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                          <img className="w-10 h-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                              alt=""/>
                                      </div>

                                      <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">John Doe
                                          </div>
                                          <div className="text-sm leading-5 text-gray-500">john@example.com</div>
                                      </div>
                                  </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">Software Engineer</div>
                                  <div className="text-sm leading-5 text-gray-500">Web dev</div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                      className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                              </td>

                              <td
                                  className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                  Owner</td>

                              <td
                                  className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </Layout>
  )
}
export default Index