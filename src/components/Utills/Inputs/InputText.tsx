import React, { FC } from "react";
import "./inputText.css";

interface InputTextInterface {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  className?: any;
}

const InputText: FC<InputTextInterface> = (props) => {
  const { placeholder, value, className } = props;
  return (
    <div style={{ width: "100%" }}>
      <input
        placeholder={placeholder}
        type="text"
        className={"input-text emptyBorder " + className}
        onChange={(e: any) => props.onChange?.(e)}
        value={value}
      />
    </div>
  );
};

export default InputText;

InputText.defaultProps = {
  className: "",
};
