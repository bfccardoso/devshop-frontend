import Header from './Header'
import Footer from './Footer'

const Layout = ({children, categories}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={categories} />
      <div className='container px-5 py-8 mx-auto'>{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
