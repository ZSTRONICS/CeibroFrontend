import React, { FC } from "react";
import "./inputText.css";

interface InputTexAreatInterface {
  placeholder?: string;
  rows?: number;
  name?: string;
  onChange?: (e: any) => void;
}

const InputTextArea: FC<InputTexAreatInterface> = (props) => {
  const { placeholder, rows, onChange, name } = props;
  return (
    <div style={{ width: "100%" }}>
      <textarea
        placeholder={placeholder}
        className="input-text-area emptyBorder"
        rows={rows || 8}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default InputTextArea;
