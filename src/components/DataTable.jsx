import React from 'react'

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto my-4 text-sm">
      <table className="min-w-full bg-white border-b border-b-gray-300">
        <thead>
          <tr>
            <th className=" py-4 border-b bg-Bordgrey px-4 F whitespace-nowrap">
              ID
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4   whitespace-nowrap ">
              Guest Name
            </th>
            <th className=" py-4  border-b bg-Bordgrey px-4  whitespace-nowrap">
              Phone Number
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Property Name
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Booking Date
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Check-In
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Check-Out
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Maximum People
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Category
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Status
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Total
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Advance
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Pending
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Security
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Payment Mode
            </th>
            <th className=" py-4 border-b bg-Bordgrey px-4  whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-4 whitespace-nowrap ">
                {row.ID}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.GuestName}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.PhoneNumber}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.PropertyName}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.BookingDate}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.CheckIn}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.CheckOut}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.MaximumPeople}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.Category}
              </td>
              <td
                className={`border-b px-4 py-4 flex items-center ${
                  row.Status === 'Canceled'
                    ? 'text-red-500'
                    : row.Status === 'Paid'
                    ? 'text-green-500'
                    : 'text-blue-500'
                }`}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    row.Status === 'Canceled'
                      ? 'bg-red-500'
                      : row.Status === 'Paid'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                />
                {row.Status}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.Total}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.Advance}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.Pending}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.Security}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.PaymentMode}
              </td>
              <td className="border-b px-4 py-4 text-blue-500 cursor-pointer whitespace-nowrap">
                {row.Action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
