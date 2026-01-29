import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { IoMdClose } from "react-icons/io";

function DeleteModal({setIsDelete,isDelete,deleteProduct}) {

  const [isLoading,setIsLoading]=useState(false)

  async function deleteModal(){
    setIsLoading(true)
    try{
      await deleteProduct()
    }catch(e){
      const error='error';
      console.log(e)
    }finally{
      setIsLoading(false)
    }
  }

  return (
       <Modal isModal={isDelete}>
       <div className="flex justify-between items-center mb-3">          
        <h2 className="text-xl font-semibold">Delete Product</h2>
          <div onClick={()=>setIsDelete('isDelete')} className="flex cursor-pointer justify-end">
            <IoMdClose />
          </div>
        </div>
          <p className="text-center">Are you sure, You want to delete this product?</p>   
          <div className="flex justify-center mt-3 gap-2">
           <button
             onClick={() =>{
               setIsDelete('isDelete')                  
                 }
                }
             className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
           >
             Cancel
           </button>
           {/* <button 
             onClick={()=>deleteModal()}
             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700">
             Delete
           </button> */}
           <Button onClick={deleteModal} isLoading={isLoading} text='Delete' color='red'></Button>
       </div>
       </Modal>
        )
}

export default DeleteModal