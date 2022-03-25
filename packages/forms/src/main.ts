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
  new TextBox('Jugar videojuegos', { key: 'actividad', label: 'Actividad', placeholder: 'abc' }),
  new FieldSet({
    legend: 'Información personal',
    children: [
      new SelectBox('2', {
        key: 'tipoDocumento',
        label: 'Tipo de documento',
        options: [
          { value: '1', text: 'Cédula' },
          { value: '2', text: 'Tarjeta de identidad', meta: ['some-metadata'] },
        ],
      }),
      new TextBox('documento', { key: 'documento', label: 'Documento', placeholder: 'Número' }),
      new DatePicker(null, { key: 'fechaNacimiento', label: 'Fecha de nacimiento' }),
      new TimePicker(new Date(), {
        key: 'horaNacimiento',
        label: 'Hora de nacimiento',
      }),
    ],
  }),
  new FieldSet({
    legend: 'Información académica',
    children: [new NumberBox(3, { key: 'semestre', label: 'Semestre', min: 0, max: 10 })],
  }),
  new CheckBox(true, { key: 'aceptaCorreos', label: 'Quiero que me envíen correos' }),
  new CheckBox(false, { key: 'aceptaTerminos', label: 'Acepto el tratamiento de datos' }),
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

const form = new Form({ dataSource: formData });
form.render(app);

saveBtn.addEventListener('click', () => {
  console.log(form.toJSON());
});
