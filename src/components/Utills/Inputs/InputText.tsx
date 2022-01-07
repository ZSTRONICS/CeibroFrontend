import React, { FC } from 'react'
import './inputText.css'

interface InputTextInterface {
    placeholder?: string;
    onChange?: (e: any) => void;
}

const InputText: FC<InputTextInterface> = (props) => {
    const { placeholder } = props
    return (
        <div style={{ width: '100%'}}>
            <input 
                placeholder={placeholder}
                type="text" 
                className="input-text"
                onChange={(e: any) => props.onChange?.(e)}
            />
        </div>
    )
}

export default InputText
