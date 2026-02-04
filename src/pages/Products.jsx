import React, { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { useSearchParams, useNavigate } from "react-router-dom";
import useSorting from "../hooks/useSorting";
import {Pagination,Loading,Table,Button} from "../components/common";
import { ProductModal,DeleteModal } from "../components/product";
import { paramValidation } from "../validation";
import { headersArray } from "../utils/constants/productTableHeaders";
import { createApi, deleteApi, getApi, updateApi } from "../services/apiService";
import backgroundImage from "../../public/background.jpeg";

function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data,setData]=useState([]);
  const [updateData, setUpdateData] = useState({});
  const [loading,setLoading]=useState(false);
  const [viewData, setViewData] = useState({});
  const [pagination, setPagination] = useState({
    skip: searchParams.get("skip") != null ? searchParams.get("skip") : 0,
    limit: searchParams.get("limit") != null ? searchParams.get("limit") : 20,
    currentPage:
      searchParams.get("page") != null ? searchParams.get("page") : 1,
  });
  const [ error, setError ] = useState(null);
  const { sorting, handleSorting } = useSorting();
  const [isModal, setIsModal] = useState({
    isCreate: false,
    isView: false,
    isDelete: false,
    isUpdate: false,
  });

  const [modalId, setModalId] = useState({ deleteId: null, updateId: null });

  function changeModalIds(name, id) {
    setModalId((prev) => ({
      ...prev,
      [name]: id,
    }));
  }

  async function fetchData() {
    setLoading(true);
    const paramsValidation = paramValidation(searchParams);
    if (paramsValidation) {
      setError("Invalid params used");
      return;
    }
    const sortingQuery =
      sorting.name != "" ? `sortBy=${sorting.name}&order=${sorting.value}` : "";
    navigate(`/products?limit=${pagination.limit}&skip=${pagination.skip}&page=${pagination.currentPage}&${sortingQuery}` );
    try{
      const response=await getApi(`products?limit=${pagination.limit}&skip=${pagination.skip}&${sortingQuery}`);
      setData(response);
    }catch(e){
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [pagination, sorting]);

  async function viewProduct(id) {
    setViewData({});
    changeModalStatus("isView");
    const response = await getApi(`products/${id}`);
    setViewData(response);
  }

  const createProduct = async (formData) => {
    await createApi("products/add",formData);
    changeModalStatus("isCreate");
  };

  async function storeUpdateForm(e, data) {
    e.preventDefault();
    await updateApi(`products/${modalId.updateId}`,data);
    fetchData();
    changeModalStatus("isUpdate");
  }

  function changeModalStatus(name) {
    setIsModal((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  async function openUpdateModal(id) {
    setUpdateData({});
    changeModalStatus("isUpdate");
    const response=await getApi(`products/${id}`);
    changeModalIds("updateId", id);
    setUpdateData(response);
  }

  async function deleteProduct() {
    await deleteApi( `products/${modalId.deleteId}`,);
    changeModalStatus("isDelete");
    fetchData();
  }

  async function deleteModal(id) {
    changeModalStatus("isDelete");
    changeModalIds("deleteId", id);
  }

  function changePage(i) {
    setPagination((prev) => ({
      ...prev,
      skip: pagination.limit * (i - 1),
      currentPage: i,
    }));
  }

  function changeLimit(i) {
    setPagination(() => ({
      limit: i,
      skip: 0,
      currentPage: 1,
    }));
  }

  
  return (
    <>
      <div style={{
        backgroundImage: `url(${backgroundImage})`
      }} className="bg-no-repeat bg-cover h-[100vh] p-3 sm:p-6 md:p-10">
        <div className="border-8 border-white/30 rounded-[25px]">
          <div className="rounded-[17px] border-gray-300 border-2">
            <div className="flex items-center  justify-between bg-white rounded-t-[15px] p-3 ">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                Products
              </h2>
              <Button
                text="Create"
                color="blue"
                icon={<IoCreate />}
                onClick={() => changeModalStatus("isCreate")}
              />
            </div>
            <div>
              <div className="sm:max-h-[77vh] max-h-[69vh] hide-scrollbar  overflow-auto">
                {loading && <Loading />}
                <Table
                  headersArray={headersArray}
                  sorting={sorting}
                  handleSorting={handleSorting}
                  error={error}
                  data={data}
                  viewProduct={viewProduct}
                  openUpdateModal={openUpdateModal}
                  deleteModal={deleteModal}
                />
              </div>
              <div className="sticky bottom-0 py-2 px-4 border-t-2 border-gray-300 bg-white rounded-b-[18px]">
                {data?.products?.length > 0 ? (
                  <Pagination
                    changeLimit={changeLimit}
                    pagination={pagination}
                    changePage={changePage}
                    pageRecord={data?.products?.length}
                    total={data.total}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductModal
        type="isCreate"
        title="Create Product"
        isModal={isModal.isCreate}
        setIsModal={changeModalStatus}
        submitProduct={createProduct}
      />
      <ProductModal
        type="isUpdate"
        title="Update Product"
        isModal={isModal.isUpdate}
        setIsModal={changeModalStatus}
        submitProduct={storeUpdateForm}
        data={updateData}
      />
      <ProductModal
        type="isView"
        title="View Product"
        isModal={isModal.isView}
        setIsModal={changeModalStatus}
        data={viewData}
      />
      <DeleteModal
        type="isDelete"
        title="Delete Product"
        isDelete={isModal.isDelete}
        setIsDelete={changeModalStatus}
        deleteProduct={deleteProduct}
      />
    </>
  );
}

export default Products;
