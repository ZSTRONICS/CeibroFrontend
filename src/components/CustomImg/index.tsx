import React from 'react'
type TProps = {
    src: string;
    className:string|any
    alt: string
};

 const CustomImg:React.FC<TProps> =(props) =>{
  return (<img {...props}/>)
}

export default CustomImg