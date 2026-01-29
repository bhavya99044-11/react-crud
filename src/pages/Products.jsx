import React, { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import CreateModal from "../components/product/CreateModal";
import ViewModal from "../components/product/ViewModal";
import DeleteModal from "../components/product/DeleteModal";
import UpdateModal from "../components/product/UpdateModal";
import backgroundImage from "../../public/background.jpeg";
import Pagination from "../components/common/Pagination";
import Table from "../components/product/Table";
import { useSearchParams, useNavigate } from "react-router-dom";
import TableHead from "../components/common/TableHead";
import useSorting from "../hooks/useSorting";
import { headersArray } from "../constants/productTableHeaders";
import Api from "../utils/Api";
import validateParams from "../validation/Params";

function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({});
  const [viewData, setViewData] = useState({});
  const [pagination,setPagination]=useState({
    'skip':searchParams.get("skip") != null ? searchParams.get("skip") : 0,
    "limit":searchParams.get("limit") != null ? searchParams.get("limit") : 20,
    "currentPage":searchParams.get("page") != null ? searchParams.get("page") : 1
  })
  const {loading,data,error,setError,apiRequest}= Api();
  const {sorting, handleSorting} = useSorting();

  const initialModal = {
    isCreate: false,
    isView: false,
    isDelete: false,
    isUpdate: false,
  };
  const [isModal, setIsModal] = useState(initialModal);

  const initalIds = {
    deleteId: null,
    updateId: null,
  };
  const [modalId, setModalId] = useState(initalIds);

  function changeModalIds(name, id) {
    setModalId((prev) => ({
      ...prev,
      [name]: id,
    }));
  }

  async function fetchData() {   
    const paramsValidation= validateParams(searchParams) 
    if(paramsValidation){
     setError('Invalid params used');
     return;
    }    
    const sortingQuery = sorting.name != "" ? `sortBy=${sorting.name}&order=${sorting.value}` : "";
    navigate(`/products?limit=${pagination.limit}&skip=${pagination.skip}&page=${pagination.currentPage}&${sortingQuery}`);
    try{
      await apiRequest(`https://dummyjson.com/products?limit=${pagination.limit}&skip=${pagination.skip}&${sortingQuery}`,'Get',null,null);
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData();
  }, [pagination, sorting]);

  async function viewProduct(id) {
    try{
      setViewData({})
      changeModalStatus('isView')      
      const data = await apiRequest(`https://dummyjson.com/products/${id}`, 'Get',null,true);
      setViewData(data)
    }catch(e){
      console.log(e)
    }
  }

  const createProduct = async (formData) => {
    try{
      await apiRequest("https://dummyjson.com/products/add",'Post',formData,null)
      fetchData();
      changeModalStatus("isCreate");
    }catch(e){
      console.log(e)
    }
  };

  async function storeUpdateForm(e, data) {
    e.preventDefault();
    try{
     await apiRequest(`https://dummyjson.com/products/${modalId.updateId}`,'Put',data)
     fetchData();
    }catch(e){
      console.log(e)
    }
    changeModalStatus("isUpdate");
    return true;
  }

  function changeModalStatus(name) {
    setIsModal((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  async function openUpdateModal(id) {
    setUpdateData({})
    changeModalStatus("isUpdate");
    try{
      const response = await apiRequest(`https://dummyjson.com/products/${id}`,'Get',null,true);
      changeModalIds("updateId", id);
      setUpdateData(response);      
    }catch(e){
      console.log(e)
    }
    }

  async function deleteProduct() {
    try{
      await apiRequest(`https://dummyjson.com/products/${modalId.deleteId}`,'Delete',null,true)
      changeModalStatus("isDelete");
      fetchData();
    }catch(e){
      console.log(e)
    }
  }

  async function deleteModal(id) {
    changeModalStatus("isDelete");
    changeModalIds("deleteId", id);
  }

  function changePage(i) {
    setPagination((prev)=>({
      ...prev,
      'skip':pagination.limit* (i - 1),
      'currentPage':i
    }))
  }

  function changeLimit(i) {
    setPagination(()=>({
      'limit':i,
      'skip':0,
      'currentPage':1
    }))
  }
  return (
    <>
      <div className={`bg-[url('${backgroundImage}')] bg-no-repeat bg-cover h-[100vh]  p-3 sm:p-6 md:p-10`}>
        <div className="border-8 border-white/30 rounded-[25px]">
          <div className="rounded-[17px] border-gray-300 border-2">
            <div className="flex items-center  justify-between bg-white rounded-t-[15px] p-3 ">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Products</h2>
              <button title="Create"
                onClick={() => changeModalStatus("isCreate")}
                className="px-2 flex py-2 font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer"
              >
                <span className="mr-1 ml-1 mt-[1px] text-xl">
                  <IoCreate />
                </span>
                <span className="hidden sm:block">Create </span>
              </button>
            </div>
            <div className="">
              <div className="sm:max-h-[77vh] max-h-[69vh] hide-scrollbar  overflow-x-auto overflow-y-auto">
                {loading && (
                  <div className="absolute  inset-0 z-50 bg-white/70 flex items-center justify-center">
                    <div className="website-loader"></div>
                  </div>
                )}
                <table className="w-full bg-white ">
                  <TableHead headersArray={headersArray} sorting={sorting} handleSorting={handleSorting}/>
                  {
                    error?<tbody><tr><th colSpan={5}>{error}</th></tr></tbody>:
                    <tbody className="">
                    <Table data={data} viewProduct={viewProduct} openUpdateModal={openUpdateModal} deleteModal={deleteModal}/>
                    </tbody>
                  }
                </table>
              </div>
              <div className="sticky bottom-0   p-2 px-4 border-t-2 border-gray-300 bg-white rounded-b-[18px]">
                {data?.products?.length > 0 ? (
                  <Pagination changeLimit={changeLimit} pagination={pagination} changePage={changePage} pageRecord={data?.products?.length} total={data.total}/>
                ) : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateModal  isCreate={isModal.isCreate} setIsCreate={changeModalStatus} createProduct={createProduct} />
      <ViewModal isView={isModal.isView} setIsView={changeModalStatus} viewData={viewData} />
      <UpdateModal isUpdate={isModal.isUpdate} storeUpdateForm={storeUpdateForm} setIsUpdate={changeModalStatus} updateData={updateData}/>
      <DeleteModal isDelete={isModal.isDelete} setIsDelete={changeModalStatus} deleteProduct={deleteProduct}/>
    </>
  );
}

export default Products;
