import React, { useLayoutEffect, useState } from "react";
import {Button,Modal} from "../common";
import { addProductValidation , updateProductValidation } from "../../validation";
import {capitalInput} from "../../utils/utils";

function ProductModal({
  type,
  title,
  isModal,
  setIsModal,
  submitProduct,
  data = null,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", price: "" });
  const [error, setError] = useState({});
  const [initialData, setInitialData] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function changeCreateForm(e) {
    let value=e.target.value
    let name = e.target.name
    value = capitalInput(value);
    setFormData((prev) => ({
      ...prev,
      [name]:value.trim(),
    }));
    if (value != "") {
      setFormData((prev) => {
        const errors = addProductValidation({
          [name]: value,
        });
        if (Object.keys(errors).length > 0) {
          const [key, value] = Object.entries(errors)[0];

          setError((prev) => ({
            ...prev,
            [key]: value,
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        return prev;
      });
    }
  }

  function changeUpdateForm(e) {
    let name = e.target.name;
    let value =e.target.value;
    value = capitalInput(value);
    setButtonDisabled(!(initialData[name] != value));
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));

    
    if (value != "") {
      setFormData((prev) => {
        const errors = updateProductValidation({
          [name]: value,
        });
        if (Object.keys(errors).length > 0) {
          const [key, value] = Object.entries(errors)[0];
          setError((prev) => ({
            ...prev,
            [key]: value,
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        return prev;
      });
    }
  }

  useLayoutEffect(() => {
    if (type != "isCreate") {
      setButtonDisabled(true);
      setFormData(data);
    }else{
      setFormData({})
    }
    setInitialData(data);
    setError({});
  }, [isModal, data]);

  async function createProductModal(e) {
    e.preventDefault();
    const isValidated = checkValidation(formData);

    if (!isValidated) {
      return;
    }

    try {
      setIsLoading(true);
      await submitProduct(formData);
      e.target.reset();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProductModal(e) {
    e.preventDefault();
    setIsLoading(true);
    const errors = updateProductValidation(formData);
    if (Object.entries(errors).length > 0) {
      setError(errors);
      setIsLoading(false);
      return;
    }
    try {
      await submitProduct(e, formData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  function checkValidation(formData) {
    const errors = addProductValidation(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return false;
    } else {
      setError({});
      return true;
    }
  }

  return (
    <Modal
      isModal={isModal}
      title={title}
      type={type}
      submitProduct={
        type == "isCreate" ? createProductModal : updateProductModal
      }
      setIsModal={setIsModal}
    >
      <div className="relative mb-1">
        Title
        <span className="text-red-500">*</span>
      </div>
      <input
        type="text"
        name="title"
        readOnly={type == "isView"}
        placeholder="Enter Title"
        value={formData?.title}
        onChange={(e) => {
          type == "isCreate" ? changeCreateForm(e) : changeUpdateForm(e);
        }}
        className="w-full px-4 py-2 capitalize  border border-gray-300 rounded-md shadow-sm  focus:ring-2 focus:ring-blue-400/30 focus:outline-none focus:ring-0"
      />
      {error?.title ? <p className="text-red-500 ">{error.title}</p> : ""}
      <div className="relative mt-2 mb-1">
        Price
        <span className="text-red-500">*</span>
      </div>
      <input
        name="price"
        readOnly={type == "isView"}
        placeholder="Enter Price"
        value={formData?.price}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          type == "isCreate" ? changeCreateForm(e) : changeUpdateForm(e);
        }}
        className="w-full focus:ring-2 focus:ring-blue-400/30 focus:outline-none focus:ring-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm "
      />
      {error?.price ? <p className="text-red-500 ">{error.price}</p> : ""}
      {type != "isView" && (
        <div className="flex mt-3 justify-end gap-2">
          <button
            disabled={isLoading}
            type="button"
            onClick={() => setIsModal(type)}
            className="px-4 cursor-pointer py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <Button
            disable={buttonDisabled}
            isLoading={isLoading}
            text={type == "isCreate" ? "Create" : "Update"}
            color="blue"
          />
        </div>
      )}
    </Modal>
  );
}

export default ProductModal;
