import Head from 'next/head'

const Seo = ({title = 'Devshop', description = 'compre artigos eletrônicos agora'}) => {
  return(
    <Head>
      <title>{title}</title>
      <meta name='description' content = {description} />
      <link rel='icon' href='/favicon-16x16.png' type='image/png' sizes='16x16'></link>
    </Head>
  )
}
export default Seo