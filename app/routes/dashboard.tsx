function dashboard() {
  return (
    <div>
        <h1>Dashboard</h1>

        {/*  table */}
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Appointment Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border px-4 py-2">John Doe</td>
                    <td className="border px-4 py-2">1234567890</td>
                    <td className="border px-4 py-2">John@gmail.com </td>
                    <td className="border px-4 py-2">12:00 PM</td>
                </tr>
                </tbody>
                </table>
    </div>
  )
}

export default dashboard