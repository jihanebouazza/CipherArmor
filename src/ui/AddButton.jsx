import { HiOutlinePlusCircle } from "react-icons/hi2";
import Button from "./Button";

function AddButton({ children, onClick = () => {} }) {
  return (
    <Button onClick={onClick}>
      <HiOutlinePlusCircle size={18} className="mr-1 mb-0.5 inline" />
      <p>{children}</p>
    </Button>
  );
}

export default AddButton;
