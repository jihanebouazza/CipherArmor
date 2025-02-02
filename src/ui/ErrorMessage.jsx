import { HiOutlineExclamationCircle } from "react-icons/hi";

function ErrorMessage({ condition, message }) {
  return (
    <>
      {condition && (
        <p className="text-ruby-500 dark:text-ruby-300 mt-1 flex items-center gap-0.5 font-medium">
          <HiOutlineExclamationCircle />
          <span className="text-sm">{message}</span>
        </p>
      )}
    </>
  );
}

export default ErrorMessage;
