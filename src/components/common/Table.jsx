import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

const Table = React.memo(
  ({
    data,
    viewProduct,
    openUpdateModal,
    deleteModal,
    headersArray,
    sorting,
    handleSorting,
    error,
  }) => {
    function generateRandomRGBA(bool) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      if (bool) {
        return `rgba(${r}, ${g}, ${b}, 0.2  )`;
      }
    }

    return (
      <table className="w-full bg-white ">
        <thead className="bg-[#F9FBFC]  border-t-2   shadow-[0_-20px_0_0_rgba(209,213,219,1),0_2px_0_0_rgba(209,213,219,1),0_0_0_2px_rgba(209,213,219,1)] z-45 sticky top-0  text-md font-bold ">
          <tr className="sticky top-0 ">
            {headersArray.map((item, i) =>
              item.type == "sticky" ? (
                <th
                  key={i}
                  className={`sticky ${item.class} capitalize site-header right-0 top-0 bg-[#F9FBFC] 
                      min-w-[150px] 
                      max-w-[150px] 
                     border-gray-100
                      before:content-[''] before:absolute
                      before:left-0 before:top-0
                      before:h-full before:w-[2px]
                      before:bg-gray-300 z-50`}
                >
                  {item.title}
                </th>
              ) : item.type == "sorting" ? (
                <th
                  key={i}
                  style={{}}
                  className={`px-1 ${item.class} capitalize truncate py-2 text-left text-gray-700`}
                >
                  <div
                    onClick={() => handleSorting(item.key)}
                    className="flex cursor-pointer items-center"
                  >
                    {item.title}
                    <div className="flex flex-col ml-1 pt-[4px]">
                      <div
                        className={`${
                          sorting.name === item.key && sorting.value === "desc"
                            ? "text-black"
                            : "text-gray-300"
                        } ${sorting.name !== item.key ? "!text-black" : ""}`}
                      >
                        <TiArrowSortedUp />
                      </div>
                      <div
                        className={` -mt-2 ${
                          sorting.name === item.key && sorting.value === "asc"
                            ? "text-black"
                            : "text-gray-300"
                        } ${sorting.name !== item.key ? "!text-black" : ""}`}
                      >
                        <TiArrowSortedDown />
                      </div>
                    </div>
                  </div>
                </th>
              ) : (
                <th
                  key={i}
                  style={{}}
                  className={`px-1 ${item.class} capitalize  py-2 text-center  text-gray-700`}
                >
                  #
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <th colSpan={5}>{error}</th>
            </tr>
          ) : (
            data?.products?.map((item, i) => (
              <tr key={i} className={` hover:bg-[#F9FBFC] `}>
                <td
                  className={`px-1 ${
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  } border-gray-300 py-4 text-center`}
                >
                  {data.skip + i + 1}
                </td>
                <td
                  className={`min-w-[150px] ${
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  }  border-gray-300 max-w-[150px] sm:min-w-[400px] truncate sm:max-w-[400px] px-1`}
                >
                  {item.title}
                </td>
                <td
                  className={`${
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  } border-gray-300`}
                  style={{
                    color: `rgba(0,0,0, 1)`,
                    marginTop: "3px",
                    borderRadius: "50px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: generateRandomRGBA(true),
                      width: "fit-content",
                    }}
                    className={`px-3 py-1 border-b-2 rounded-[15px] flex items-center capitalize`}
                  >
                    {item.category}
                  </div>
                </td>
                <td
                  className={`${
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  } border-gray-300 px-1`}
                >
                  {item.price}
                </td>
                <td
                  className="
                px-1 mb-0
                bg-[#F9FBFC]
                sticky right-0 z-40
                relative
                after:content-['']
                after:absolute                            
                after:left-0
                after:bottom-0
                after:-top-[1px]
                after:w-full
                after:h-[2px]
                after:bg-gray-300
                before:content-[''] before:absolute
                before:left-0 before:top-0
                before:h-full before:w-[2px]
                before:bg-gray-300 right-0 text-xl gap-2 text-center mx-auto"
                >
                  <div className="flex  items-center justify-center gap-2">
                    <div
                      title="View"
                      onClick={() => viewProduct(item.id)}
                      className="text-center cursor-pointer text-blue-500 flex align-center justify-center"
                    >
                      <FaRegEye />
                    </div>
                    <div
                      title="Edit"
                      onClick={() => {
                        openUpdateModal(item.id);
                      }}
                      className="text-center cursor-pointer ml-1 text-orange-500 flex align-center justify-center"
                    >
                      <RiEdit2Fill />
                    </div>
                    <div
                      title="Delete"
                      onClick={() => {
                        deleteModal(item.id);
                      }}
                      className="text-center text-[16px] cursor-pointer text-red-500 flex align-center justify-center"
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
  }
);

export default Table;
