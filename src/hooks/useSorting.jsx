import React, { useState } from 'react'

const useSorting=(initial={name:'',value:""})=> {

  const [sorting,setSorting]  =useState(initial)

  const handleSorting=(name)=> {
    var sortingValue = "";
    var sortingName = "";
        if (sorting.name != name) {
          sortingName = name;
          sortingValue = "asc";
        } else if (sorting.name == name && sorting.value == "asc") {
          sortingName = name;
          sortingValue = "desc";
        }
        setSorting({
          name: sortingName,
          value: sortingValue,
        });
  }

  return {sorting,handleSorting}
}

export default useSorting