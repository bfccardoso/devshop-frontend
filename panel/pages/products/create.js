import React, { useState } from 'react'
import Layout from '../../components/layout/index.js'
import Title from '../../components/layout/title/index.js'
import { fetcher, useMutation, useQuery } from '../../lib/graphql.js'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/button/index.js'
import Input from '../../components/input/index.js'
import Table from '../../components/layout/table/index.js'
import Select from '../../components/select/index.js'
import * as Yup from 'yup'

const CREATE_PRODUCTS = `
  mutation createProduct($name: String!, $slug: String!, $description: String!, $category: String!, $sku: String, $price: Float, $weight: Float, $optionNames: [String!], $variations: [VariationInput!]){
    panelCreateProduct (input: {
      name: $name,
      slug: $slug,
      description: $description,
      category: $category,
      sku: $sku,
      price: $price,
      weight: $weight,
      optionNames: $optionNames,
      variations: $variations
    }) {
      id
      name
      slug
      description
    }
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

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
    .required('Por favor, informe um nome.'),
  description: Yup.string()
    .min(20, 'Por favor, faça uma descrição com no mínimo 20 caracteres.')
    .required('Por favor, faça uma descrição.'),
  category: Yup.string()
    .min(1, 'Por favor, selecione uma categoria.')
    .required('Por favor, selecione uma categoria.'),
  slug: Yup.string()
    .min(3, 'Por favor, informe pelo menos um slug com 3 caracteres.')
    .required('Por favor, informe um slug para o produto.')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este já está em uso',
      async value => {
        const ret = await fetcher(
          JSON.stringify({
            query: `
            query{
              getProductBySlug(slug: "${value}"){
                id
              }
            }
          `
          })
        )
        if (ret.errors) {
          return true
        }
        return false
      }
    )
})

const Index = () => {
  const router = useRouter()
  const [variations, setVariations] = useState([
    { variation1: '', variation2: '' }
  ])
  const [data, createProduct] = useMutation(CREATE_PRODUCTS)
  const { data: categories, mutate } = useQuery(GET_ALL_CATEGORIES)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: '',
      sku: '',
      price: 0,
      weight: 0,
      optionName1: '',
      optionName2: '',
      variations: []
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const newValues = {
        ...values,
        price: Number(values.price),
        weight: Number(values.weight),
        optionNames: [values.optionName1, values.optionName2],
        variations: values.variations.map(variation => {
          return {
            ...variation,
            price: Number(variation.price),
            weight: Number(variation.weight)
          }
        })
      }
      const data = await createProduct(newValues)
      if (data && !data.errors) {
        router.push('/products')
      }
    }
  })

  // tratar os options
  let options = []
  if (categories && categories.getAllCategories) {
    options = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name
      }
    })
  }
  const addVariation = () => {
    setVariations(old => {
      return [
        {
          ...old,
          ...{
            optionName1: '',
            optionName2: '',
            sku: '',
            price: 0,
            weight: 0
          }
        }
      ]
    })
  }

  return (
    <Layout>
      <Title>Criar novo produto</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href={'/products'}>Voltar</Button.LinkOutline>
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
                  label='Nome do produto'
                  placeholder='Preencha com o nome do produto'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                ></Input>
                <Input
                  label='Slug do produto'
                  placeholder='Preencha com o slug do produto'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  helpText='Slug é utilizado para URLs amigáveis.'
                  errorMessage={form.errors.slug}
                ></Input>
                <Input
                  label='Descrição do produto'
                  placeholder='Preencha com a descrição do produto'
                  value={form.values.description}
                  onChange={form.handleChange}
                  name='description'
                  errorMessage={form.errors.description}
                ></Input>
                <Select
                  label='Selecione a categoria'
                  name='category'
                  onChange={form.handleChange}
                  value={form.values.category}
                  options={options}
                  errorMessage={form.errors.category}
                  initial={{ id: '', label: 'Selecione...' }}
                />
                <Input
                  label='sku do produto'
                  placeholder='Preencha com o sku do produto'
                  value={form.values.sku}
                  onChange={form.handleChange}
                  name='sku'
                  errorMessage={form.errors.sku}
                ></Input>
                <Input
                  label='Preço do produto'
                  placeholder='Preencha com o preço do produto'
                  value={form.values.price}
                  onChange={form.handleChange}
                  name='price'
                  errorMessage={form.errors.price}
                ></Input>
                <Input
                  label='Peso do produto'
                  placeholder='Preencha com o peso do produto'
                  value={form.values.weight}
                  onChange={form.handleChange}
                  name='weight'
                  errorMessage={form.errors.weight}
                ></Input>
                <h3>Variações / grade de produtos</h3>
                <Input
                  label='Opção de variação 1'
                  placeholder='Preencha com o peso do produto'
                  value={form.values.optionName1}
                  onChange={form.handleChange}
                  name='optionName1'
                  errorMessage={form.errors.optionName1}
                ></Input>
                <Input
                  label='Opção de variação 2'
                  placeholder='Preencha com o peso do produto'
                  value={form.values.optionName2}
                  onChange={form.handleChange}
                  name='optionName2'
                  errorMessage={form.errors.optionName2}
                ></Input>
              </div>
              {form.values.optionName1 !== '' && (
                <>
                  <FormikProvider value={form}>
                    <FieldArray
                      name='variations'
                      render={arrayHelpers => {
                        return (
                          <div className='shadow'>
                            <Button
                              type='button'
                              onClick={() =>
                                arrayHelpers.push({
                                  optionName1: '',
                                  optionName2: '',
                                  sku: '',
                                  price: 0,
                                  weight: 0
                                })
                              }
                            >
                              Adicionar varição
                            </Button>
                            <Table>
                              <Table.Head>
                                <Table.Th>{form.values.optionName1}</Table.Th>
                                {form.values.optionName2 !== '' && (
                                  <Table.Th>{form.values.optionName2}</Table.Th>
                                )}
                                <Table.Th>SKU</Table.Th>
                                <Table.Th>Preço</Table.Th>
                                <Table.Th>Peso</Table.Th>
                                <Table.Th></Table.Th>
                              </Table.Head>

                              <Table.Body>
                                {form.values.variations.map(
                                  (variation, index) => {
                                    {
                                      return (
                                        <Table.Tr key={index}>
                                          <Table.Td>
                                            <Input
                                              label={form.values.optionName1}
                                              placeholder='Preencha com o nome da variação'
                                              value={
                                                form.values.variations[index]
                                                  .optionName1
                                              }
                                              onChange={form.handleChange}
                                              name={`variations.${index}.optionName1`}
                                            />
                                          </Table.Td>
                                          {form.values.optionName2 !== '' && (
                                            <Table.Td>
                                              <Input
                                                label={form.values.optionName2}
                                                placeholder='Preencha com o nome da variação'
                                                value={
                                                  form.values.variations[index]
                                                    .optionName2
                                                }
                                                onChange={form.handleChange}
                                                name={`variations.${index}.optionName2`}
                                              />
                                            </Table.Td>
                                          )}
                                          <Table.Td>
                                            <Input
                                              label='SKU'
                                              placeholder='Preencha com o SKU'
                                              value={
                                                form.values.variations[index]
                                                  .sku
                                              }
                                              onChange={form.handleChange}
                                              name={`variations.${index}.sku`}
                                            />
                                          </Table.Td>
                                          <Table.Td>
                                            <Input
                                              label='Preço'
                                              placeholder='Preencha com o preço da variação'
                                              value={
                                                form.values.variations[index]
                                                  .price
                                              }
                                              onChange={form.handleChange}
                                              name={`variations.${index}.price`}
                                            />
                                          </Table.Td>
                                          <Table.Td>
                                            <Input
                                              label='Peso'
                                              placeholder='Preencha com o peso da variação'
                                              value={
                                                form.values.variations[index]
                                                  .weight
                                              }
                                              onChange={form.handleChange}
                                              name={`variations.${index}.weight`}
                                            />
                                          </Table.Td>
                                          <Table.Td>
                                            <Button type='button' onClick={() => arrayHelpers.remove(index)}>Excluir</Button>
                                          </Table.Td>
                                        </Table.Tr>
                                      )
                                    }
                                  }
                                )}
                              </Table.Body>
                            </Table>
                          </div>
                        )
                      }}
                    />
                  </FormikProvider>
                </>
              )}
              <Button>Criar produto</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Index
