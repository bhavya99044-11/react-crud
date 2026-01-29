
import {toast} from 'react-toastify';

const commonToastOptions={
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

const notification = (type,message)=>{
    switch(type){
        case 'success':
            console.log('success called')
            toast.success(message,commonToastOptions)
            break;
        case 'error':
            toast.error(message,commonToastOptions)
            break;
        default:
            toast.info(message,commonToastOptions);
    }
}

export {notification};