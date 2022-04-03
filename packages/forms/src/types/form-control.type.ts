import {
  CheckBox,
  DatePicker,
  FieldSet,
  NumberBox,
  RadioGroup,
  SelectBox,
  TextArea,
  TextBox,
  TimePicker,
} from '../controls';

export type FormControl =
  | FieldSet
  | TextBox
  | TextArea
  | NumberBox
  | SelectBox
  | CheckBox
  | RadioGroup
  | DatePicker
  | TimePicker;

export type FormControls = Array<FormControl>;
