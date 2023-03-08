import { FC } from "react";
import InputHOC from "./InputHOC";
import "./inputText.css";

interface InputInterface {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  className?: any;
  name?: string;
  title?: string;
  maxLength?:any
}

const Input: FC<InputInterface> = (props) => {
  const { title, placeholder, value, className, name,maxLength } = props;
  return (
    <InputHOC title={title || ""}>
      <input
      {...props}
        placeholder={placeholder}
        type="text"
        className={"input-text emptyBorder no-border-input " + className}
        onChange={(e: any) => props.onChange?.(e)}
        value={value}
        name={name}
        maxLength={maxLength}
      />
    </InputHOC>
  );
};

export default Input;
