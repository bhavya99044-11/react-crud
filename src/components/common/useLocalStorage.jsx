import React from 'react'

function useLocalStorage(key) {

    const storeInLocal =(value)=> {localStorage.setItem(key,JSON.stringify(value))}

    const getFromLocal =()=>{return JSON.parse(localStorage.getItem(key));}

    return {storeInLocal,getFromLocal}

}

export default useLocalStorage