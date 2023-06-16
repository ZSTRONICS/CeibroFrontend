import { UserInterface } from "./user.interface";

export interface QuestioniarOptionInterface {
  _id: string;
  option: string;
  selectedBy: UserInterface[];
  percentage: number | null;
}

export interface QuestioniarInterface {
  type: "multiple" | "checkbox" | "shortAnswer";
  question: string;
  _id: string | number;
  options?: QuestioniarOptionInterface[] | any;
  answer?: string | string[] | number;
  id?:string
}
