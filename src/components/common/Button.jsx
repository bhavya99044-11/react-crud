import React from 'react'

function Button({onClick,isLoading,text,color,disable=false}) {
  console.log(isLoading)
  return (
    <button disabled={isLoading || disable} type="submit" className='cursor-pointer' onClick={onClick}>
     <div
      style={{
        opacity:disable?'70%':""
      }}
     className={` px-4 py-2 bg-${color}-600 text-white flex items-center justify-center gap-2 rounded ${disable||isLoading?`cursor-not-allowed`:`hover:bg-${color}-700`} `}>
       {isLoading?<div className='loader'></div>:''} {text}
     </div>
    </button>
  )
}

export default Button