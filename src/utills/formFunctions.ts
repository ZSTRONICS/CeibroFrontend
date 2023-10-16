//@ts-nocheck
import { ICountryData } from "components/material-ui/customMuiTextField/types";
import { FormikProps } from "formik";
import parsePhoneNumber from "libphonenumber-js";

export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>,
  formikRef: React.MutableRefObject<FormikProps<FormikValues> | FormikProps<IInputValues> | undefined | any>,
  changeValue?: ICountryData
) => {
  if (e.target.outerText || e.target.id === "dialCode") {
    formikRef.current?.setFieldValue("dialCode", changeValue?.dial_code);
  } else {
    const { name, value } = e.target;
    formikRef.current?.setFieldValue(name, value);
  }
};


export const checkValidPhoneNumber=(phoneNumber:string)=>{
  const checkPhoneNumber = parsePhoneNumber(phoneNumber);
    if (checkPhoneNumber?.isValid()) {
       return {isValid:true,msg:"valid"}
    } else {
      return {isValid:false,msg:"Invlid phone number"}
    }
}