import {
  CheckBox,
  DatePicker,
  NumberBox,
  RadioGroup,
  SelectBox,
  TextArea,
  TextBox,
  TimePicker,
} from '../controls';

export type FormControl =
  | TextBox
  | TextArea
  | NumberBox
  | SelectBox
  | CheckBox
  | RadioGroup
  | DatePicker
  | TimePicker;

export type FormControls = Array<FormControl>;
