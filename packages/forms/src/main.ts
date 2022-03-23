import {
  CheckBox,
  DatePicker,
  Form,
  FormControls,
  NumberBox,
  RadioGroup,
  SelectBox,
  TextArea,
  TextBox,
  TimePicker,
} from './lib';

const app = document.querySelector<HTMLDivElement>('#app')!;

const formData: FormControls = [
  new TextBox(),
  new TextArea(),
  new NumberBox(),
  new SelectBox(),
  new CheckBox(),
  new RadioGroup(),
  new DatePicker(),
  new TimePicker(),
];

const form = new Form({ dataSource: formData });
form.render(app);
