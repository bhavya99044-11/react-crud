import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { IoMdClose } from "react-icons/io";

const DeleteModal = ({ setIsDelete,title ,isDelete, deleteProduct }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteModal() {
    setIsLoading(true);
    try {
      await deleteProduct();
    } catch (e) {
      const error = "error";
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isModal={isDelete} title={title} setIsModal={setIsDelete} type="isDelete">
      <p className="text-center">
        Are you sure, You want to delete this product?
      </p>
      <div className="flex justify-center mt-3 gap-2">
        <button
          onClick={() => {
            setIsDelete("isDelete");
          }}
          className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <Button
          onClick={deleteModal}
          isLoading={isLoading}
          text="Delete"
          color="red"
        ></Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
