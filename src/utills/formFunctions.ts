import { ICountryData } from "components/material-ui/customMuiTextField/types";
import { FormikProps } from "formik";
import { RefObject } from "react";

type FormValues = {
  dialCode: string;
  phoneNumber: string;
};

export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>,
  formRef: RefObject<FormikProps<FormValues>> | null,
  changeValue?: ICountryData
) => {
  if (e.target.outerText || e.target.id === "dialCode") {
    formRef.current?.setFieldValue("dialCode", changeValue?.dial_code);
  } else {
    const { name, value } = e.target;
    formRef.current?.setFieldValue(name, value);
  }
};
