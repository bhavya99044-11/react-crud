import React,{useLayoutEffect, useState} from 'react'
import Button from '../common/Button';
import Modal from '../common/Modal';
import { updateValidation } from '../../validation/Product';
import { IoMdClose } from "react-icons/io";
import capitalInput from '../../utils/capitalInput';

function UpdateModal({isUpdate,setIsUpdate,updateData,storeUpdateForm}) {

  const [isLoading,setIsLoading]=useState(false)
  
  const [initialData,setInitialData]=useState({})
  const [buttonDisabled,setButtonDisabled]=useState(true)
  const [formData,setFormData]=useState({});
  const [error,setError]=useState({})

  async function changeUpdateForm(e){

      if(initialData[e.target.name] != e.target.value){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value.trim()
    }))
    if(e.target.value !=''){
    setFormData((prev)=>{
        const errors=updateValidation({
          [e.target.name]:e.target.value
        });
        if(Object.keys(errors).length>0){
              const [key,value]=Object.entries(errors)[0]
              setError((prev)=>({
                ...prev,
                [key]:value
              }))
        }else{
          setError((prev)=>({
            ...prev,
            [e.target.name]:''
          }))
        }
        return prev;
      })
    }

  }

  useLayoutEffect(()=>{
    setButtonDisabled(true)
    setFormData(updateData)
    setInitialData(updateData)
    setError({})
  },[updateData])

   async function submitForm(e){
     e.preventDefault();
     setIsLoading(true)
      const errors=updateValidation(formData);
      console.log(errors)
      if(Object.entries(errors).length>0){
        setError(errors)
        setIsLoading(false);
        return
      }
      try{
        await storeUpdateForm(e,formData)
      }catch(e){
        console.log(e)
      }finally{
        setIsLoading(false)
      }      
  }

  return (
    <Modal isModal={isUpdate}>
        <div className="flex justify-between items-center mb-3">          
        <h2 className="text-xl font-semibold">Update Product</h2>
          <div onClick={()=>setIsUpdate('isUpdate')} className="flex cursor-pointer justify-end">
            <IoMdClose />
          </div>
        </div>        <form onSubmit={(e)=>submitForm(e)}>
        <div className="relative mt-2 mb-1">
          Title
          <span className="text-red-500">*</span>
        </div>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            onChange={(e)=>{(changeUpdateForm(e))
              e.target.value=capitalInput(e.target.value)
            }}
            value={formData?.title}
            className="w-full capitalize  px-4 py-2 border border-gray-300 rounded-md shadow-sm  focus:ring-2 focus:ring-blue-400/30 focus:outline-none focus:ring-0"
          />  
          {error?.title!='' ?<p className='text-red-500'>{error.title}</p>:''}
          <div className="relative mt-2 mb-1">
          Price
          <span className="text-red-500">*</span>
        </div>
          <input
            name="price"
            onChange={(e)=>{
              changeUpdateForm(e)
              e.target.value = e.target.value.replace(/[^0-9.]/g, '')
            }}
            placeholder="Enter Price"
            value={formData?.price}
            className="w-full  px-4 py-2 border border-gray-300 rounded-md shadow-sm  focus:ring-2 focus:ring-blue-400/30 focus:outline-none focus:ring-0"
          />  
          {error?.price !=''?<p className='text-red-500'>{error.price}</p>:''}

        <div className="flex mt-3 justify-end gap-2">
            <button type="button"
            disabled = {isLoading}
              onClick={() =>{
                   setIsUpdate('isUpdate')       
                  }
                 }
              className="px-4 py-2 border cursor-pointer rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <Button disable={buttonDisabled} isLoading={isLoading}  color="blue" text="Update"/>
            </div>
        </form>
        </Modal>
  )
}

export default UpdateModal

