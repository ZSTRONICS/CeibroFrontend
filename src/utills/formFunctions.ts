import { ICountryData } from "components/material-ui/customMuiTextField/types";
import { FormikProps, FormikValues, } from "formik";

export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>,
  formRef: FormikProps<FormikValues> | null,
  changeValue?: ICountryData
) => {
  if (e.target.outerText) {
    formRef.current?.setFieldValue("dialCode", changeValue?.dial_code);
  } else {
    const { name, value } = e.target;
    formRef.current?.setFieldValue(name, value);
  }
};
