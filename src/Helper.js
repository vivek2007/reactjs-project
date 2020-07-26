import { ToastContainer,Zoom,toast } from 'react-toastify';
// import { bcrypt } from 'bcrypt';
import 'react-toastify/dist/ReactToastify.css';


export function toastmsg(message,position,autoClose)
{
    //alert(message);return
    toast.dismiss();
    const xyz =  toast.success(message, {
    position: position, //toast.POSITION.TOP_CENTER
    type: toast.TYPE.DEFAULT,
    autoClose: 5000,// 5sec
    className:'blue',
    pauseOnHover:true,
    newestOnTop:true
    })
    return xyz;
}


