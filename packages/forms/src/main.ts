import './app.css';
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
  new TextBox(null, {
    key: 'actividad',
    label: 'Actividad',
    placeholder: 'Longitud: 5 - 20 caracteres',
    validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
  }),
  new FieldSet({
    legend: 'Información personal',
    cols: 2,
    children: [
      new SelectBox(null, {
        key: 'tipoDocumento',
        label: 'Tipo de documento',
        options: [
          { value: '', text: '-- Seleccionar --' },
          { value: '1', text: 'Cédula' },
          { value: '2', text: 'Tarjeta de identidad', meta: ['some-metadata'] },
        ],
        validators: [Validators.required],
      }),
      new TextBox(null, {
        key: 'documento',
        label: 'Documento',
        placeholder: 'Número',
        validators: [Validators.required],
      }),
      new DatePicker(null, {
        key: 'nombres',
        label: 'Nombres',
        validators: [Validators.required],
      }),
      new DatePicker(null, {
        key: 'apellidos',
        label: 'Apellidos',
        validators: [Validators.required],
      }),
      new DatePicker(null, {
        key: 'fechaNacimiento',
        label: 'Fecha de nacimiento',
        validators: [Validators.required],
      }),
      new TimePicker(null, {
        key: 'horaNacimiento',
        label: 'Hora de nacimiento',
        validators: [Validators.required],
      }),
    ],
  }),
  new FieldSet({
    legend: 'Información de contacto',
    cols: 2,
    children: [
      new SelectBox(null, {
        key: 'ciudad',
        label: 'Ciudad',
        options: [
          { value: '', text: '-- Seleccionar --' },
          { value: '1', text: 'Medellín' },
          { value: '2', text: 'Cali' },
          { value: '3', text: 'Bogotá' },
        ],
        validators: [Validators.required],
      }),
      new TextBox(null, {
        key: 'codigoPostal',
        label: 'Código postal',
        validators: [Validators.required],
      }),
      new TextBox(null, {
        key: 'email',
        placeholder: 'someone@mail.com',
        label: 'Correo electrónico',
        validators: [Validators.required, Validators.email],
      }),
      new TextBox(null, {
        key: 'direccion',
        label: 'Dirección',
        validators: [Validators.required],
      }),
    ],
  }),
  new FieldSet({
    legend: 'Información académica',
    cols: 2,
    children: [
      new SelectBox(null, {
        key: 'programa',
        label: 'Programa',
        options: [
          { value: '', text: '-- Seleccionar --' },
          { value: '1', text: 'Derecho' },
          { value: '2', text: 'Matemáticas' },
          { value: '3', text: 'Ing. Sistemas' },
          { value: '4', text: 'Ing. Química' },
        ],
        validators: [Validators.required],
      }),
      new NumberBox(null, {
        key: 'semestre',
        label: 'Semestre',
        validators: [Validators.required, Validators.min(1), Validators.max(10)],
      }),
    ],
  }),
  new FieldSet({
    legend: 'Notificaciones y política de tratamiento de datos',
    children: [
      new CheckBox(null, {
        key: 'aceptaTratamientoDatos',
        label: 'Acepta nuestra política de tratamiento de datos',
        validators: [Validators.requiredTrue],
      }),
      new CheckBox(null, {
        key: 'aceptaEnvioNotificaciones',
        label: 'Acepta que le enviemos notificaciones del proceso',
      }),
      new RadioGroup(null, {
        key: 'metodoNotificaciones',
        text: 'Seleccione el método de atención favorito',
        items: [
          {
            value: 'email',
            label: '✉️ Email',
          },
          {
            value: 'whatsapp',
            label: '🤳 Whatsapp',
          },
          {
            value: 'llamada',
            label: '📞 Llamada',
          },
        ],
        validators: [Validators.required],
      }),
    ],
  }),
  new FieldSet({
    legend: 'Feedback',
    children: [
      new RadioGroup(null, {
        key: 'satisfaccion',
        text: 'Seleccione el nivel de satisfacción',
        items: [
          { value: '1', label: '⭐' },
          { value: '2', label: '⭐⭐' },
          { value: '3', label: '⭐⭐⭐' },
          { value: '4', label: '⭐⭐⭐⭐' },
          { value: '5', label: '⭐⭐⭐⭐⭐' },
        ],
        validators: [Validators.required],
      }),
      new TextArea(null, {
        key: 'observaciones',
        label: 'Observaciones',
        placeholder: '¿Cómo podemos mejorar? 🤔',
        validators: [Validators.required],
      }),
    ],
  }),
];

const form = new Form({
  dataSource: formData,
  plugins: [
    new ValidationsPlugin({
      messages: {
        required: 'Campo obligatorio',
        requiredTrue: 'Debe aceptar la política de tratamiento de datos',
        email: 'El correo electrónico es inválido',
        min: 'El valor {1} es incorrecto. El mínimo definido es {0}',
        max: 'El valor {1} es incorrecto. El máximo definido es {0}',
        minLength: 'longitud incorrecta: mínimo es {0} y el valor ingresado es {1}',
        maxLength: 'longitud incorrecta: máximo es {0} y el valor ingresado es {1}',
      },
    }),
  ],
});
form.render(app);

saveBtn.addEventListener('click', () => {
  const errors = form.validate();
  console.log(errors);

  if (!errors?.length) {
    console.log(form.toJSON());
  }
});
