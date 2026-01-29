import { useEffect, useState } from "react";

function Modal({ isModal, children }) {
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
        className={`bg-white m-8 rounded-lg shadow-lg w-full max-w-md p-6 relative
        ${closing
          ? "animate-[popupClose_0.3s_ease-in]"
          : "animate-[popupOpen_0.3s_ease-out]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
