import { toast } from "react-toastify";

type TypeType = "success" | "error" | "warning" | "info" | "default";
const notify = (content: string, type: TypeType) => {
  return toast(content, {
    type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default notify;
