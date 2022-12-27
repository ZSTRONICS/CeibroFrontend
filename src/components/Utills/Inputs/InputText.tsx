import { FC } from "react";
import "./inputText.css";

interface InputTextInterface {
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  className?: any
  name?: any
  disabled?: boolean
}

const InputText: FC<InputTextInterface> = (props) => {
  const { placeholder, value, className, name, disabled } = props;
  return (
    <div style={{ width: "100%" }}>
      <input
        placeholder={placeholder}
        type="text"
        className={"input-text emptyBorder " + className}
        onChange={(e: any) => props.onChange?.(e)}
        value={value||""}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default InputText;

InputText.defaultProps = {
  className: "",
};
