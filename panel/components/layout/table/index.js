import React from "react"

const Table = ({children}) => {
  return (
    <table className="min-w-full">
      {children}
    </table>
  )
}
const TableHead = ({children}) => {
  return (<thead><tr>{children}</tr></thead>)
}
const TableTh = ({children}) => {
  return <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-blue-100">{children}</th>
}
const TableBody = ({children}) => {
  return (<tbody className="bg-white">{children}</tbody>)
}
const TableTr = ({children}) => {
  return (<tr>{children}</tr>)
}
const TableTd = ({children}) => {
  return (<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{children}</td>)
}
Table.Head = TableHead
Table.Th = TableTh
Table.Body = TableBody
Table.Tr = TableTr
Table.Td = TableTd

export default Table