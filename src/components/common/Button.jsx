import React from "react";
import { IoCreate } from "react-icons/io5";
import { cn } from "../../utils/utils";

function Button({
  onClick,
  isLoading,
  text,
  color,
  disable = false,
  icon = null,
}) {
  return (
    <button
      disabled={isLoading || disable}
      type="submit"
      className="cursor-pointer"
      onClick={onClick}
    >
      <div
        style={{
          backgroundColor:color,
          opacity: disable ? "70%" : "",
        }}
        className={`px-4 py-2 text-white flex items-center justify-center gap-2 rounded ${
          disable || isLoading ? 'cursor-not-allowed' : `hover:bg-${color}-700`
        } `}
      >
        {isLoading && <div className="loader"/>}
        {icon && (
          <span className="mx-1 mt-[1px] text-xl">
            <IoCreate />
          </span>
        )}
        <span className={cn(icon&&'hidden sm:block')}>{text}</span>
      </div>
    </button>
  );
}

export default Button;
