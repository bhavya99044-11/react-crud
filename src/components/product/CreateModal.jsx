import React, { useLayoutEffect, useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { createValidation } from "../../validation/Product";
import { IoMdClose } from "react-icons/io";
import capitalInput from "../../utils/capitalInput";

function CreateModal({ isCreate, setIsCreate, createProduct }) {
  const initialFormData = {
    title: "",
    price: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error,setError] = useState({});

  function formDataChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));

    
    if(e.target.value !=''){
      setFormData((prev)=>{
        const errors=createValidation({
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
    setFormData(initialFormData)
    setError({})
  },[isCreate])

  async function createProductModal(e) {
    e.preventDefault();
    const isValidated=checkValidation(formData);
    
    if(!isValidated){
      return ;
    }
  
    try {
      setIsLoading(true);
  
       await createProduct(formData);

        e.target.reset();

  
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  function checkValidation(formData){
    console.log(formData)
    const errors=createValidation(formData)
    
    if(Object.keys(errors).length>0){
      setError(errors)
      return false;
    }else{
      setError({})
      return true;
    }
  }


  return (
    <Modal isModal={isCreate}>
      <form onSubmit={(e) => createProductModal(e)}>
        <div className="flex justify-between items-center mb-3">          
        <h2 className="text-xl font-semibold">Create Product</h2>
          <div onClick={()=>setIsCreate('isCreate')} className="flex cursor-pointer justify-end">
            <IoMdClose />
          </div>
        </div>
        <div className="relative mb-1">
            Title
            <span className="text-red-500">*</span>
          </div>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          onChange={(e) => {formDataChange(e)
            e.target.value=capitalInput(e.target.value)
          }}
          className="w-full px-4 py-2 capitalize  border border-gray-300 rounded-md shadow-sm  focus:ring-2 focus:ring-blue-400/30 focus:outline-none focus:ring-0"
        />
        {error?.title ? <p className="text-red-500 ">{error.title}</p> : ""}
        <div className="relative mt-2 mb-1">
          Price
          <span className="text-red-500">*</span>
        </div>        <input
          name="price"
          placeholder="Enter Price"
          onChange={(e) =>{
            formDataChange(e)
            e.target.value = e.target.value.replace(/[^0-9.]/g, '')
          }}
          className="w-full focus:ring-2 focus:ring-blue-400/30 focus:outline-none focus:ring-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm "
        />
        {error?.price ? <p className="text-red-500 ">{error.price}</p> : ""}
        <div className="flex mt-3 justify-end gap-2">
          <button
          disabled={isLoading}
          type="button"
            onClick={() => setIsCreate("isCreate")}
            className="px-4 cursor-pointer py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <Button isLoading={isLoading} text="Create" color="blue" />
        </div>
      </form>
    </Modal>
  );
}

export default CreateModal;
