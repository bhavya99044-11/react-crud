import React from 'react'

function ActionButton({title,icon,onClick,className}) {
  return (
    <button title={title} onClick={onClick} className={className}>
        {icon}
    </button>
  )
}

export default ActionButton