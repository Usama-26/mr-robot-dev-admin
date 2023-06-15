import AppLayout from "@/layouts/AppLayout";

export default function Security() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-black mb-4">reCaptcha</h1>
          <h1 className="font-bold text-2xl text-black mb-4">Total: 0</h1>
        </div>
        <div className="overflow-auto table-height w-full">
          <table className="w-full min-w-max table-auto text-left border-collapse">
            <thead className="bg-indigo-950  sticky top-0">
              <tr>
                <th className="table-header">S.No</th>
                <th className="table-header">User Classification</th>
                <th className="table-header">IP Address</th>
                <th className="table-header">Country</th>
                <th className="table-header">Date</th>
                <th className="table-header">Results</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-slate-100 odd:bg-white">
                <td className="table-cell">1</td>
                <td className="table-cell">Human</td>
                <td className="table-cell">221112212</td>
                <td className="table-cell">Australia</td>
                <td className="table-cell">20/05/2023</td>
                <td className="table-cell">
                  <span className="text-green-500">Successful</span>
                </td>
              </tr>
              <tr className="even:bg-slate-100 odd:bg-white">
                <td className="table-cell">2</td>
                <td className="table-cell">Bot</td>
                <td className="table-cell">221112212</td>
                <td className="table-cell">UK</td>
                <td className="table-cell">20/05/2023</td>
                <td className="table-cell">
                  <span className="text-red-500">Failed</span>
                </td>
              </tr>
              <tr className="even:bg-slate-100 odd:bg-white">
                <td className="table-cell">3</td>
                <td className="table-cell">Bot</td>
                <td className="table-cell">221112212</td>
                <td className="table-cell">USA</td>
                <td className="table-cell">20/05/2023</td>
                <td className="table-cell">
                  <span className="text-red-500">Failed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
