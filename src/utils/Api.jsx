import React, { useState } from 'react'

function Api() {

  const [error,setError]  =useState(false);
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState([]);

  const apiRequest =async (url,method='post',data=null,id=null)=>{
    console.log(data)
    if(id==null)setLoading(true);
    const options={
      method,
      headers:{
        'Content-Type':'application/json'
      },
    }
    if(data){
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url,options)
    if(!response.ok){
      setLoading(false)
      setError(response.message)
      throw new Error('Error got caught');
    }else{
      if(id!=null){
        const data= await response.json();
        return data;
      }
      const data=await response.json();
      setData(data)
      setLoading(false)
    }

  }

  return {error,loading,data,setError,apiRequest}
}

export default Api