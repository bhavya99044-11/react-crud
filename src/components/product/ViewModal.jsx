import React,{useState} from 'react';
import { IoMdClose } from "react-icons/io";
import Modal from '../common/Modal';


function ViewModal({isView,setIsView,viewData}) {

  return (
    <Modal isModal={isView}>
            <div className="flex justify-between border-gray-300 items-center mb-3">          
        <h2 className="text-xl font-semibold">View Product</h2>
          <div onClick={()=>setIsView('isView')} className="flex cursor-pointer justify-end">
            <IoMdClose />
          </div>
        </div>
          <label className='mb-1'>
            Title
          </label>
          <div className="w-full h-10 mb-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
            {viewData?.title}
          </div>
          <label className="mt-2 mb-1">
            Price
          </label>
          <div className="w-full mb-3 h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
            {viewData?.price}
          </div>
    </Modal>
  )
}

export default ViewModal