import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashAlt, FaRegEye } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import ActionButton from "./ActionButton";
import { cn } from "../../utils/utils";
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
                  className={cn(item.class,'sticky-site-header')}
                >
                  {item.title}
                </th>
              ) : item.type == "sorting" ? (
                <th
                  key={i}
                  style={{}}
                  className={cn('px-1 capitalize truncate py-2 text-left text-gray-700',item.class)}
                >
                  <div
                    onClick={() => handleSorting(item.key)}
                    className="flex cursor-pointer items-center"
                  >
                    {item.title}
                    <div className="flex flex-col ml-1 pt-[4px]">
                      <div
                        className={cn(
                          sorting.name === item.key && sorting.value === "desc"
                            ? "text-black"
                            : "text-gray-300",
                        sorting.name !== item.key ? "!text-black" : "")}
                      >
                        <TiArrowSortedUp />
                      </div>
                      <div
                        className={cn('-mt-2',
                          sorting.name === item.key && sorting.value === "asc"
                            ? "text-black"
                            : "text-gray-300",
                        sorting.name !== item.key ? "!text-black" : "")}
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
                  className={cn('px-1 capitalize  py-2 text-center  text-gray-700',item.class)}
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
                  className={cn('px-1 border-gray-300 py-4 text-center',
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  )}
                >
                  {data.skip + i + 1}
                </td>
                <td
                  className={cn(
                    "min-w-[150px] border-gray-300 max-w-[150px] sm:min-w-[400px] truncate sm:max-w-[400px] px-1",
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  )}
                >
                  {item.title}
                </td>
                <td
                  className={cn(
                    "border-gray-300 mt-1 rounded-[50px] ",
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  )}
                >
                  <div
                    style={{
                      backgroundColor: generateRandomRGBA(true),
                    }}
                    className="px-3 py-1 border-b-2 w-fit rounded-[15px] flex items-center capitalize"
                  >
                    {item.category}
                  </div>
                </td>
                <td
                  className={cn(
                    "border-gray-300 px-1",
                    i == data.products.length - 1 ? "border-b-0 " : "border-b-2"
                  )}
                >
                  {item.price}
                </td>
                <td className="sticky-action-cell">
                  <div className="flex  items-center justify-center gap-2">
                    <ActionButton
                      icon={<FaRegEye />}
                      title="View"
                      onClick={() => viewProduct(item.id)}
                      className="text-center cursor-pointer text-blue-500 flex align-center justify-center"
                    />
                    <ActionButton
                      icon={<RiEdit2Fill />}
                      title="Edit"
                      onClick={() => openUpdateModal(item.id)}
                      className="text-center cursor-pointer ml-1 text-orange-500 flex align-center justify-center"
                    />
                    <ActionButton
                      icon={<FaTrashAlt />}
                      title="Delete"
                      onClick={() => deleteModal(item.id)}
                      className="text-center text-[16px] cursor-pointer text-red-500 flex align-center justify-center"
                    />
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
