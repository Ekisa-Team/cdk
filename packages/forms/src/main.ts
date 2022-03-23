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
const saveBtn = document.querySelector<HTMLDivElement>('#saveBtn')!;

const formData: FormControls = [
  new TextBox('actividad', { label: 'Actividad', placeholder: 'abc' }),
  new FieldSet({
    legend: 'Información personal',
    children: [
      new SelectBox('tipoDocumento', {
        label: 'Tipo de documento',
        options: [
          { value: '1', text: 'Cédula' },
          { value: '2', text: 'Tarjeta de identidad', meta: ['some-metadata'] },
        ],
      }),
      new TextBox('documento', { label: 'Documento', placeholder: 'Número' }),
      new DatePicker('fechaNacimiento', { label: 'Fecha de nacimiento' }),
      new TimePicker('horaNacimiento', { label: 'Hora de nacimiento' }),
    ],
  }),
  new FieldSet({
    legend: 'Información académica',
    children: [new NumberBox('semestre', { label: 'Semestre', min: 0, max: 10 })],
  }),
  new CheckBox('aceptaCorreos', { label: 'Quiero que me envíen correos' }),
  new CheckBox('aceptaTerminos', { label: 'Acepto el tratamiento de datos' }),

  new RadioGroup('colorFavorito', {
    title: 'Escoja su color favorito',
    items: [
      { label: 'Amarillo', value: 'yellow' },
      { label: 'Azul', value: 'blue' },
      { label: 'Rojo', value: 'red' },
    ],
  }),

  new TextArea('observaciones', {
    label: 'Observaciones',
    placeholder: 'Lista de items que se desarrollarán en la actividad',
    cols: 60,
    rows: 10,
  }),
];

const form = new Form({ dataSource: formData });
form.render(app);

saveBtn.addEventListener('click', () => {
  console.log(form.toJSON());
});
