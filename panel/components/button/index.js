import Link from 'next/link'
import React from 'react'

const Button = ({ children, type='submit' }) => {
  return (
    <button type={type} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      {children}
    </button>
  )
}
const ButtonLink = ({ href, children }) => {
  return (
    <Link
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      href={href}
    >
      {children}
    </Link>
  )
}
const ButtonLinkOutline = ({ href, children }) => {
  return (
    <Link
      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
      href={href}
    >
      {children}
    </Link>
  )
}

Button.Link = ButtonLink
Button.LinkOutline = ButtonLinkOutline

export default Button
