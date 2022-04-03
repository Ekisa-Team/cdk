export type MySelectBoxModel = {
  valueExpr: string;
  displayExpr: string;
};

export type MyRadioModel = {
  valueExpr: string;
  displayExpr: string;
};

export type MyTextAreaModel = {
  columns: number;
  rows: number;
};

export type MyValidatorModel = {
  type: 'required' | 'email' | 'min' | 'max' | 'minLength' | 'maxLength';
  value?: string;
};

export type MyQuestionType =
  | 'group'
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'date'
  | 'time'
  | 'checkbox'
  | 'radio';

export type MyQuestionModel = {
  dataField: string;
  type: MyQuestionType;
  label?: string;
  placeholder?: string;
  validators?: Array<MyValidatorModel>;
  textareaOptions?: MyTextAreaModel;
  selectboxOptions?: Array<MySelectBoxModel>;
  radioOptions?: Array<MyRadioModel>;
};

export type MyGroupModel = {
  type: 'fieldset';
  title: string;
  columns: number;
  questions: Array<MyQuestionModel>;
};

export type MyFormModel = Array<MyQuestionModel | MyGroupModel>;
