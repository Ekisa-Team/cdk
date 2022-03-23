import {
  CheckBox,
  DatePicker,
  FieldSet,
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
  new FieldSet({
    legend: 'Address information',
    children: [
      new TextBox(),
      new FieldSet({
        legend: 'Nested fieldset',
        children: [
          new FieldSet({
            legend: 'Another nested fieldset',
            children: [new CheckBox(), new CheckBox()],
          }),
        ],
      }),
    ],
  }),
];

const form = new Form({ dataSource: formData });
form.render(app);
