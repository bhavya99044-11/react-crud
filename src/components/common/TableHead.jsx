import React from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

function TableHead({headersArray,sorting,handleSorting}) {
  return (
    <thead className="bg-[#F9FBFC]  border-t-2   shadow-[0_-20px_0_0_rgba(209,213,219,1),0_2px_0_0_rgba(209,213,219,1),0_0_0_2px_rgba(209,213,219,1)] z-45 sticky top-0  text-md font-bold ">
    <tr className="sticky top-0 ">
        {
            headersArray.map((item,i)=>(
                item.type =='sticky'?
                <th key={i} className={`sticky ${item.class} capitalize site-header right-0 top-0 bg-[#F9FBFC] 
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
                :item.type=='sorting'?
                <th key={i}
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
                        sorting.name === item.key &&
                        sorting.value === "desc"
                          ? "text-black"
                          : "text-gray-300"
                      } ${
                        sorting.name !== item.key ? "!text-black" : ""
                      }`}
                    >
                      <TiArrowSortedUp />
                    </div>
                    <div
                      className={` -mt-2 ${
                        sorting.name === item.key &&
                        sorting.value === "asc"
                          ? "text-black"
                          : "text-gray-300"
                      } ${
                        sorting.name !== item.key ? "!text-black" : ""
                      }`}
                    >
                      <TiArrowSortedDown />
                    </div>
                  </div>
                </div>
              </th>: <th key={i}
                   style={{}}
                   className={`px-1 ${item.class} capitalize  py-2 text-center  text-gray-700`}
               >
                   #
               </th>
                
            ))
        }
    </tr>
  </thead>
  )
}

export default TableHead