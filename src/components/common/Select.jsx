import React, { useState , useRef ,useEffect} from 'react'
import { IoMdArrowDropdown } from "react-icons/io";


function Select({value,optionArray,onClick}) {

  const ref = useRef(null)  ;

  const [isOpen,setIsOpen]=useState(false)

  function handleClick(){
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function changeValue(i){
    onClick(i)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className='relative' onClick={()=>{
        handleClick()
      }}>
        <div
        className="ml-2 cursor-pointer appearance-none rounded-lg border border-gray-200 focus:outline-none bg-white py-2 pl-3 pr-8 text-sm leading-tight text-gray-700 shadow-sm" >
            {value}
        </div>
        {isOpen &&
            <div className='bg-white shadow-lg overflow-y-scroll hide-scrollbar  max-h-34 border border-gray-200 -top-35 left-2 mt-1 rounded-lg flex flex-col w-full p-1 absolute min-w-[20px] '>
                {
                    optionArray.map((i)=>(
                        <div key={i} className='cursor-pointer' onClick={()=>changeValue(i)}>{i}</div>
                    ))
                }            
            </div>
        }

        <div className='absolute cursor-pointer top-3 right-2'>
          <IoMdArrowDropdown />
        </div>
      </div>  )
}

export default Select