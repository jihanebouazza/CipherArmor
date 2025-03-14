import { HiOutlineArrowPath, HiOutlineSquare2Stack } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useState } from "react";
import PasswordPropertyCounter from "./PasswordPropertyCounter";
import PasswordLengthSelector from "./PasswordLengthSelector";
import { generatePassword } from "../../utils/passwordUtils";
import toast from "react-hot-toast";

function PasswordGenerator() {
  const [symbols, setSymbols] = useState(2);
  const [digits, setDigits] = useState(3);
  const [uppercase, setUppercase] = useState(3);
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("#<wD4fx36VNy");

  return (
    <>
      <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl leading-none font-semibold">
        Password generator
      </h4>
      <p className="dark:text-charcoal-400 text-charcoal-600 leading-5">
        Build a password with the perfect balance of security.
      </p>
      <div className="my-2 space-y-2">
        <PasswordPropertyCounter
          title="Symbols"
          increase={() => setSymbols((symbols) => symbols + 1)}
          decrease={() => setSymbols((symbols) => symbols - 1)}
          value={symbols}
        />
        <PasswordPropertyCounter
          title="Digits"
          increase={() => setDigits((digits) => digits + 1)}
          decrease={() => setDigits((digits) => digits - 1)}
          value={digits}
        />
        <PasswordPropertyCounter
          title="Upper case characters"
          increase={() => setUppercase((uppercase) => uppercase + 1)}
          decrease={() => setUppercase((uppercase) => uppercase - 1)}
          value={uppercase}
        />
        <PasswordLengthSelector
          length={length}
          setLength={setLength}
          min={uppercase + digits + symbols}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="dark:border-charcoal-300 dark:text-charcoal-50 bg-ocean-100 dark:bg-charcoal-800 border-charcoal-100 w-full truncate overflow-hidden rounded-lg border px-3 py-1.5">
            {password}
          </div>
          <Button
            type="rawlg"
            onClick={() =>
              generatePassword(symbols, digits, uppercase, length, setPassword)
            }
          >
            <HiOutlineArrowPath size={20} />
          </Button>
          <Button
            type="rawlg"
            onClick={() => {
              navigator.clipboard.writeText(password);
              toast.success("Password has been copied to your clipboard.");
            }}
          >
            <HiOutlineSquare2Stack size={20} />
          </Button>
        </div>
        <p className="text-charcoal-500 dark:text-charcoal-400 text-xs">
          Your password contains {symbols} symbols, {digits} digits, and{" "}
          {uppercase} characters.
        </p>
      </div>
    </>
  );
}

export default PasswordGenerator;
