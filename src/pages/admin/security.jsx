import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "@/layouts/AppLayout";
import { withAuth } from "@/components/Helpers/withAuth";
import { getCaptcha } from "@/redux/features/features.actions";
import Pagination from "@/components/pagination";

const Security = () => {
  const dispatch = useDispatch();
  const captchaData = useSelector(({ features }) => features.captcha);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  useEffect(() => {
    dispatch(getCaptcha(currentPage));
  }, []);
  const fetchNextRecords = (number) => {
    getCaptcha(number);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(pageNumber);
  };
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-black mb-4">reCaptcha</h1>
          <h1 className="font-bold text-2xl text-black mb-4">
            Total: {captchaData?.totalResults}
          </h1>
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
              {captchaData?.results?.map((item, index) => (
                <>
                  {" "}
                  <tr className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">
                      {" "}
                      {index + 1 + (currentPage - 1) * recordsPerPage}
                    </td>
                    <td className="table-cell">{item?.userClassification}</td>
                    <td className="table-cell">{item?.ipAddress}</td>
                    <td className="table-cell">{item?.country}</td>
                    <td className="table-cell">20/05/2023</td>
                    <td className="table-cell">
                      {item?.result === "Success" ? (
                        <span className="text-green-500 font-medium">
                          Successful
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">Failed</span>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          className="flex md:flex-row flex-col justify-between items-center pt-4 mx-5 mb-5 mt-5"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 ">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {`${(currentPage - 1) * 10 + 1}-${Math.min(
                currentPage * 10,
                captchaData?.totalResults
              )}`}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {captchaData.totalResults}
            </span>
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={captchaData.totalPages}
            handleClick={handleClick}
          />
        </nav>
      </div>
    </AppLayout>
  );
};
export default withAuth(Security);
