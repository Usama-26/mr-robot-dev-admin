export default function ApprovalsTable({ data, headers, heading }) {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-black mb-4">{heading}</h1>
        <h1 className="font-bold text-2xl text-black mb-4">
          Total: {data.length}
        </h1>
      </div>
      <div className="overflow-auto table-height w-full">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead className="bg-indigo-950  sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                sr_no,
                email,
                phone,
                first_name,
                date,
                country,
                sur_name,
                status,
              }) => (
                <>
                  <tr key={sr_no} className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">{sr_no}</td>
                    <td className="table-cell">{first_name}</td>
                    <td className="table-cell"> {sur_name}</td>
                    <td className="table-cell"> {email}</td>
                    <td className="table-cell"> {phone}</td>
                    <td className="table-cell">{country}</td>
                    <td className="table-cell">{date}</td>
                    {status && <td className="table-cell">{status}</td>}
                    <td className="table-cell">
                      <button
                        type="button"
                        className="bg-green-600 text-white px-6 py-2 rounded-full mr-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="bg-red-600 text-white px-6 py-2 rounded-full"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                </>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}