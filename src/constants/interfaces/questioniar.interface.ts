export interface QuestioniarInterface {
  type: "multiple" | "checkbox" | "shortAnswer";
  question: string;
  id: string | number;
  options?: string[];
  answer?: string[];
}
