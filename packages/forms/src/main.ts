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
import { ValidationsPlugin } from './lib/plugins/validations.plugin';
import { Validators } from './lib/validators';

const app = document.querySelector<HTMLDivElement>('#app')!;
const saveBtn = document.querySelector<HTMLDivElement>('#saveBtn')!;

const formData: FormControls = [
  new TextBox('abc', {
    key: 'actividad',
    label: 'Actividad',
    placeholder: 'abc',
    validators: [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(20),
    ],
  }),
  new FieldSet({
    legend: 'Información personal',
    children: [
      new SelectBox(null, {
        key: 'tipoDocumento',
        label: 'Tipo de documento',
        options: [
          { value: '', text: '-- Seleccionar --' },
          { value: '1', text: 'Cédula' },
          { value: '2', text: 'Tarjeta de identidad', meta: ['some-metadata'] },
        ],
      }),
      new TextBox('documento', { key: 'documento', label: 'Documento', placeholder: 'Número' }),
      new DatePicker(null, {
        key: 'fechaNacimiento',
        label: 'Fecha de nacimiento',
      }),
      new TimePicker(null, {
        key: 'horaNacimiento',
        label: 'Hora de nacimiento',
      }),
    ],
  }),
  new FieldSet({
    legend: 'Información de contacto',
    children: [
      new TextBox(null, {
        key: 'email',
        placeholder: 'someone@mail.com',
        label: 'Correo electrónico',
        validators: [Validators.email],
      }),
    ],
  }),
  new FieldSet({
    legend: 'Información académica',
    children: [
      new NumberBox(5, {
        key: 'semestre',
        label: 'Semestre',
        validators: [Validators.min(3), Validators.max(10)],
      }),
    ],
  }),
  new CheckBox(true, { key: 'aceptaCorreos', label: 'Quiero que me envíen correos' }),
  new CheckBox(true, {
    key: 'aceptaTerminos',
    label: 'Acepto el tratamiento de datos',
    validators: [Validators.requiredTrue],
  }),
  new RadioGroup(null, {
    key: 'colorFavorito',
    text: 'Escoja su color favorito',
    items: [
      { label: 'Amarillo', value: 'yellow' },
      { label: 'Azul', value: 'blue' },
      { label: 'Rojo', value: 'red' },
    ],
  }),
  new TextArea('observaciones', {
    key: 'observaciones',
    label: 'Observaciones',
    placeholder: 'Lista de items que se desarrollarán en la actividad',
    cols: 60,
    rows: 10,
  }),
];

const form = new Form({ dataSource: formData, plugins: [new ValidationsPlugin()] });
form.render(app);

saveBtn.addEventListener('click', () => {
  const errors = form.validate();
  console.log(errors);

  if (!errors?.length) {
    console.log(form.toJSON());
  }
});
