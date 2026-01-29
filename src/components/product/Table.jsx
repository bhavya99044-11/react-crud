import React from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Table=React.memo(({data,viewProduct,openUpdateModal,deleteModal})=> {

    function generateRandomRGBA(bool) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
    
        if(bool){
          return `rgba(${r}, ${g}, ${b}, 0.2  )`;
        }
      }

  return (
        data?.products?.map((item, i) => (                      
          <tr
            key={i}
            className={` hover:bg-[#F9FBFC] `}
          >
            <td className={`px-1 ${i==data.products.length-1?'border-b-0 ':'border-b-2'} border-gray-300 py-4 text-center`}>{data.skip+i+1}</td>
            <td className={`min-w-[150px] ${i==data.products.length-1?'border-b-0 ':'border-b-2'}  border-gray-300 max-w-[150px] sm:min-w-[400px] truncate sm:max-w-[400px] px-1`}>{item.title}</td>
            <td className={`${i==data.products.length-1?'border-b-0 ':'border-b-2'} border-gray-300`} style={{                          
              color:`rgba(0,0,0, 1)`,
              marginTop:'3px',
              borderRadius:'50px',
            }} ><div
              style={{
                backgroundColor:generateRandomRGBA(true),
                width:'fit-content'
              }}
            className={`px-3 py-1 border-b-2 rounded-[15px] flex items-center capitalize`}>{item.category}</div></td>
            <td className={`${i==data.products.length-1?'border-b-0 ':'border-b-2'} border-gray-300 px-1`}>{item.price}</td>
            <td className="
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
                before:bg-gray-300 right-0 text-xl gap-2 text-center mx-auto">
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
  )
},(prevProps,nextProps)=>{
    return prevProps.data === nextProps.data
});

export default Table