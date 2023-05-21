import Swal from "sweetalert2";

type IconType = "success" | "error" | "warning" | "info" | "question";
const alert2 = (
  title: string,
  icon: IconType,
  showConfirmButton: boolean,
  confirmButtonText: string,
  confirmButtonColor: string,
  showCancelButton: boolean,
  cancelButtonText: string,
  cancelButtonColor: string,
  titleText: string,
  text: string,
  handleConfirm: () => void
) => {
  return Swal.fire({
    title: title,
    icon: icon,
    showCancelButton,
    cancelButtonText,
    showConfirmButton,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonColor,
    titleText,
    text,
  }).then((result) => {
    if (result.isConfirmed) {
      handleConfirm();
    }
  });
};

export default alert2;
