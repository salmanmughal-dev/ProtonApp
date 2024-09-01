import { toast } from "react-toastify";

export default function successToast(message: string) {
  toast.success(message, {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
