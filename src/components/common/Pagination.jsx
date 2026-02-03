import React from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import {Select} from './';

function Pagination({pagination,total,changePage,changeLimit}) {

  const {limit,currentPage} = pagination;

  let pages=Math.ceil(total/limit);

  const startPage=1;

  const endPage=pages;

  let middleStartPage=null;
  let middleEndPage=pages-1;

  if(currentPage-2<=1){
    middleStartPage=startPage+1;
  }else if(currentPage==pages){
    middleStartPage=currentPage-2;
  }else{
    middleStartPage=currentPage-1;

  }

  middleEndPage=middleStartPage+2;

  if(middleEndPage>=endPage){
    middleEndPage=endPage-1;
  }
  else if(endPage-middleEndPage<=2){
    middleEndPage=endPage-1;
  }


  let array=[];

  for(let i=middleStartPage;i<=middleEndPage;i++){
    array.push(i)
  }

  function handleLimit(e){
    changeLimit(e)
  }

  function handlePreviousPage(i){
    let previousPage=i-1;
    previousPage=previousPage<=0?1:previousPage
    changePage(previousPage)
  }

  function handleNextPage(i){
    let nextPage=i+1;
    nextPage=nextPage>pages?pages:nextPage
    changePage(nextPage)
  }

  return (
    <div className='flex py-2 z-50  flex-col sm:flex-row justify-end sm:justify-between justify-between'>
      <div className='flex sm:mb-0 mb-1 items-center justify-center gap-2'>
        <div className='flex items-center'>
          <span className='sm:block hidden '> Showing </span>
          <div className='relative '>
            <Select value={limit} optionArray={[10,15,20,25,30]} onClick={handleLimit}/>
          </div>
            <div className='ml-2'>items out of {total}</div>
        </div>
      </div>
      <div class="">
        <nav class="flex gap-1 flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
            <button disabled={currentPage==startPage} onClick={()=>handlePreviousPage(currentPage)}  class={`${currentPage==startPage?'!cursor-not-allowed !bg-gray-100':''} cursor-pointer flex w-8 h-8 rounded-full bg-gray-200 justify-center items-center  text-black`}
                 title="Previous Page">
                <span class="sr-only">Previous Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="block w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>  
            <button onClick={()=>changePage(startPage)} className={`cursor-pointer w-8 h-8  bg-white ${currentPage==1?'current-page':''}`}>
                {startPage}
            </button> 
            {
              currentPage>=4?  
                <button className='w-8 h-8 '>
                ...
            </button>  :''
            }
            {array.map((i)=>(
                <button key={i} onClick={()=>changePage(i)} className={`${currentPage==i?'current-page':''} cursor-pointer w-8 h-8  bg-white`}>
                    {i}
                </button> 
                ))                
            }
            {endPage-middleEndPage>2?
                <button className='w-8 h-8 bg-white'>
                ...
                </button> 
                :''
            }
            <button onClick={()=>changePage(endPage)} className={`w-8 h-8 cursor-pointer  bg-white ${currentPage==pages?'current-page':''} `}>
                {endPage}
            </button>         
            <button disabled={currentPage==pages} onClick={()=>handleNextPage(currentPage)} class={`${currentPage==pages?'!cursor-not-allowed !bg-gray-100':''} flex w-8 h-8 justify-center cursor-pointer  items-center rounded-full  bg-gray-200`}
                title="Next Page">
                <span class="sr-only">Next Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="block w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </nav>
      </div>
  </div>
  )
}

export default Pagination