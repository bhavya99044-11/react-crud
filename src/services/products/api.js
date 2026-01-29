

const createProduct = async (formData) => {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if(!response.ok){
      const error ='error';
    }
    await response.json();
    changeModalStatus("isCreate");
    fetchData();
  };

  async function fetchData() {                                                                                                                                                                                                                                                                                                                                                                                                               
    setLoading(true);
    const sortingQuery = sorting.name != "" ? `sortBy=${sorting.name}&order=${sorting.value}` : "";
    navigate(`/crud?limit=${limit}&skip=${skip}&page=${currentPage}&${sortingQuery}`);
    const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&${sortingQuery}`);
    !data.ok?setLoading(false):''
    const response = await data.json();
    setData(response);
    setLoading(false);
  }