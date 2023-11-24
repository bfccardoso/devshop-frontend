import React from 'react'

const Card = ({children}) => {
  return (
    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
      <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
        {children}
      </div>
    </div>
  )
}
const CardIcon = ({children}) => {
  return (
    <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">{children}</div>
  )
}
const CardData = ({children}) => {
  return (
    <div className="mx-5">{children}</div>
  )
}
const CardTitle = ({children}) => {
  return (
    <h4 className="text-2xl font-semibold text-gray-700">{children}</h4>
  )
}
const CardDescription = ({children}) => {
  return (
    <div className="text-gray-500">{children}</div>
  )
}
Card.Icon = CardIcon
Card.Data = CardData
Card.Title = CardTitle
Card.Description = CardDescription

export default Card