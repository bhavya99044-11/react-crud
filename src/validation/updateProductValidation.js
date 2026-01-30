const required ='This field is required.';

export const updateProductValidation = (data) => {
    const stat = data ?? {}
    if(Object.entries(stat).length>0){
  
      let errors = {};
      
      if ('title' in data && (data?.title == '' || data?.title.trim() === "")) {
        errors.title = required;
      }
      
      if ('price' in data && ( data?.price === "" || data?.price === "" )) {
        errors.price = required;
      }else if('price' in data && (Number.isNaN(Number(data.price)) )){
        errors.price = 'Price must be a number.'
      }
      
      return errors;
    }else{
      return {}
    }
  };