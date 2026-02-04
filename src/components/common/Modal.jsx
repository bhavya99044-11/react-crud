import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../utils/utils";

function Modal({ isModal, type,title ,children,submitProduct,setIsModal }) {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isModal) {
      setShow(true);
      setClosing(false);
    } else if (show) {
      setClosing(true);
      setTimeout(() => {
        setShow(false);
        setClosing(false);
      }, 300);
    }
  }, [isModal]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div
        className={cn('bg-white m-8 rounded-lg shadow-lg w-full max-w-md p-4 relative',
        
          closing
            ? "animate-[popupClose_0.3s_ease-in]"
            : "animate-[popupOpen_0.3s_ease-out]"
  )}
      >
        <form onSubmit={(e) => submitProduct(e)}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div
              onClick={() => setIsModal(type)}
              className="flex cursor-pointer justify-end"
            >
              <IoMdClose />
            </div>
          </div>
          {children}
        </form>
      </div>
    </div>
  );
}

export default Modal;
