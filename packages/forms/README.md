# @ekisa-cdk/forms

[![NPM version](https://img.shields.io/npm/v/@ekisa-cdk/forms?color=a1b858&label=)](https://www.npmjs.com/package/@ekisa-cdk/forms)

## Table of contents

- [Getting started](#getting-started)
- [Basic usage](#basic-usage)
- [Form control options](#form-control-options)
  - [FieldSet](#fieldset)
  - [TextBox](#textbox)
  - [TextArea](#textarea)
  - [NumberBox](#numberbox)
  - [SelectBox](#selectbox)
    - [SelectBoxOptions](#selectboxoptions)
  - [CheckBox](#checkbox)
  - [RadioGroup](#radiogroup)
    - [RadioGroupItemOptions](#radiogroupitemoptions)
  - [DatePicker](#datepicker)
  - [TimePicker](#timepicker)
- [API options](#api-options)
  - [Get control](#get-control)
  - [Render](#render)
  - [Reset](#reset)
  - [Validate](#validate)
  - [Validate control](#validate-control)
  - [To JSON](#to-json)
- [Generated data attribute](#generated-data-attributes)
- [Validators](#validators)
- [Plugins](#plugins)
  - [AutoMapper](#automapper-external)
  - [Events](#events-external)
  - [Validations](#validations-internal)
  - [Custom](#custom-external)
- [Theming](#theming)
- [Examples](#examples)
- [To do](#to-do)
  - [Create examples](#create-examples)

## **Getting started**

**1. Install package**:

```
npm i @ekisa-cdk/forms
```

## **Basic usage**

**1. Import Form and form controls classes**:

```ts
import { Form, FormControls, TextBox } from '@ekisa-cdk/forms';
```

**2. Create an instance and pass in a data source that corresponds to the controls that will be rendered**:

```ts
const dataSource: FormControls = [
  new TextBox(null, {
    key: 'name',
    label: 'Name',
    placeholder: 'Enter your name',
  }),
  new TextBox(null, {
    key: 'lastname',
    label: 'Last name',
    placeholder: 'Enter your last name',
  }),
];

const form = new Form({ dataSource });
form.render();
```

## **Form control options**

### Fieldset

| Name     | Type            | Default value |
| -------- | --------------- | ------------- |
| type     | FormControlType | FieldSet      |
| legend   | string          | undefined     |
| cols     | Columns         | 1             |
| children | FormControls    | []            |

### TextBox

| Name        | Type            | Default value |
| ----------- | --------------- | ------------- |
| type        | FormControlType | TextBox       |
| key         | string          | Empty         |
| value       | string          | undefined     |
| label       | string          | undefined     |
| placeholder | string          | undefined     |
| validators  | ValidatorFn[]   | []            |

### TextArea

| Name        | Type            | Default value |
| ----------- | --------------- | ------------- |
| type        | FormControlType | TextArea      |
| key         | string          | Empty         |
| value       | string          | undefined     |
| label       | string          | undefined     |
| placeholder | string          | undefined     |
| cols        | string          | undefined     |
| rows        | string          | undefined     |
| validators  | ValidatorFn[]   | []            |

### NumberBox

| Name       | Type            | Default value |
| ---------- | --------------- | ------------- |
| type       | FormControlType | NumberBox     |
| key        | string          | Empty         |
| value      | number          | undefined     |
| label      | string          | undefined     |
| min        | number          | undefined     |
| max        | number          | undefined     |
| validators | ValidatorFn[]   | []            |

### SelectBox

| Name       | Type              | Default value |
| ---------- | ----------------- | ------------- |
| type       | FormControlType   | SelectBox     |
| key        | string            | Empty         |
| value      | string            | undefined     |
| label      | string            | undefined     |
| options    | SelectBoxOption[] | []            |
| validators | ValidatorFn[]     | []            |

### SelectBoxOptions

| Name  | Type   | Default value |
| ----- | ------ | ------------- |
| value | string | undefined     |
| text  | string | undefined     |
| meta  | string | undefined     |

### CheckBox

| Name       | Type            | Default value |
| ---------- | --------------- | ------------- |
| type       | FormControlType | CheckBox      |
| key        | string          | Empty         |
| value      | boolean         | undefined     |
| label      | string          | Empty         |
| validators | ValidatorFn[]   | []            |

### RadioGroup

| Name       | Type             | Default value |
| ---------- | ---------------- | ------------- |
| type       | FormControlType  | RadioGroup    |
| key        | string           | Empty         |
| value      | string           | undefined     |
| text       | string           | undefined     |
| items      | RadioGroupItem[] | []            |
| validators | ValidatorFn[]    | []            |

### RadioGroupItemOptions

| Name  | Type   | Default value |
| ----- | ------ | ------------- |
| value | string | undefined     |
| label | string | undefined     |

### DatePicker

| Name       | Type            | Default value |
| ---------- | --------------- | ------------- |
| type       | FormControlType | DatePicker    |
| key        | string          | Empty         |
| value      | Date            | undefined     |
| label      | string          | undefined     |
| validators | ValidatorFn[]   | []            |

### TimePicker

| Name       | Type            | Default value |
| ---------- | --------------- | ------------- |
| type       | FormControlType | TimePicker    |
| key        | string          | Empty         |
| value      | Date            | undefined     |
| label      | string          | undefined     |
| validators | ValidatorFn[]   | []            |

## **Validators**

| Name         | Input             | Output           |
| ------------ | ----------------- | ---------------- |
| required     | N/A               | ValidationErrors |
| requiredTrue | N/A               | ValidationErrors |
| email        | N/A               | ValidationErrors |
| min          | min: number       | ValidatorFn      |
| max          | max: number       | ValidatorFn      |
| minLength    | minLength: number | ValidatorFn      |
| maxLength    | maxLength: number | ValidatorFn      |
| pattern      | pattern: RegExp   | ValidatorFn      |

## **API options**

### Get control

Get control by key identifier

### Render

Will render the generated form inside some specified target

**Arguments**
| Name | Type |
| ------------ | ----------------- |
| parent | HTMLBodyElement - HTMLDivElement |

### Reset

Reset all form control values to null

### Validate

Check the validity of all the configured control validators

### Validate Control

Check the validity of a single configured control validators

**Arguments**
| Name | Type |
| ---- | ------ |
| key | string |

### To JSON

Convert controls values to JSON format. You can pass a type to return your data typed.

## **Generated data-attributes**

Data attributes are useful to categorize elements allowing styles customization and tracking the control validity state.

**Form**

```ts
[data-unit-type="Form"]
```

**FieldSet**

```ts
[data-unit-type="FieldSet"]
[data-unit-type="FieldSetLegend"]
```

**Control Wrapper**

```ts
[data-unit-type="Wrapper"]
[data-status="valid"]
[data-status="invalid"]
[data-for="::FormControlType::"]
```

**Label**

```ts
[data-unit-type="Label"]
```

**Validations**

```ts
[data-unit-type="ValidationsWrapper"]
[data-unit-type="ValidationItem"]
```

**TextBox**

```ts
[data-unit-type="TextBox"]
```

**TextArea**

```ts
[data-unit-type="TextArea"]
```

**NumberBox**

```ts
[data-unit-type="NumberBox"]
```

**SelectBox**

```ts
[data-unit-type="SelectBox"]
[data-unit-type="SelectBoxOption"]
```

**CheckBox**

```ts
[data-unit-type="CheckBoxItemWrapper"]
[data-unit-type="CheckBoxItem"]
```

**RadioGroup**

```ts
[data-unit-type="RadioGroup"]
[data-unit-type="RadioGroupText"]
[data-unit-type="RadioGroupItemWrapper"]
[data-unit-type="RadioGroupItem"]
```

**DatePicker**

```ts
[data-unit-type="DatePicker"]
```

**TimePicker**

```ts
[data-unit-type="TimePicker"]
```

Check the official **[ValidationsPlugin](https://github.com/Ekisa-Team/cdk/blob/main/packages/forms/src/plugins/validations.plugin.ts)** to see how these attributes can be used or refer to the [**theming section**](#theming) to see them in action.

## **Plugins**

Plugins are building blocks that extend the form functionality. @ekisa/forms come with built-in plugins that are useful for different purposes and make the integration process seamlessly. There are two types of plugins: internal and external. Internal plugins will run inside the codebase and cannot be modified, although they could be rewritten as custom plugins but would probably need more logic on the implementation side because external plugins cannot listen for events that occur inside the form class. All internal plugins must be passed to the class constructor at the instantiation moment. External plugins whatsoever can be fully replaced by custom plugins and are easy to replicate or modify. All custom plugins are external.

### **AutoMapper (external)**

Automapper is a plugin that will take care for you of all the complex validations between your incoming data and the automatic generation of the **data source**. To do this you need to create a **mapping profile** that will tell the plugin how to interpret your models. This plugin is ideal if you need to fetch the questions from a database or another data source and automatically render a form without complex processing in the middle.

#### Usage

**1. Whether you're fetching your data from a relational or non-relational database, define your models to have awareness of the data structure.**

```ts
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
  controlType: MyQuestionType;
  label?: string;
  placeholder?: string;
  rules?: Array<MyValidatorModel>;
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
```

**2. Create a mapping profile**

> This will tell the plugin how to map your model inside the form

```ts
import { AutoMapperPluginConfig } from '@ekisa-cdk/forms';

const mappingProfile: AutoMapperPluginConfig<MyQuestionType> = {
  types: {
    FieldSet: 'group',
    TextBox: 'text',
    TextArea: 'textarea',
    NumberBox: 'number',
    SelectBox: 'select',
    CheckBox: 'checkbox',
    RadioGroup: 'radio',
    DatePicker: 'date',
    TimePicker: 'time',
  },
  keys: {
    controlTypePropertyName: 'controlType', // bound to MyQuestionModel -> controlType
    fieldSet: {
      // bound to MyGroupModel
      legend: 'title',
      cols: 'columns',
      children: 'questions',
    },
    control: {
      // bound to MyQuestionModel
      key: 'dataField',
      value: 'value',
      label: 'label',
      placeholder: 'placeholder',
      validators: 'rules',
    },
    textAreaOptions: {
      // bound to MyTextAreaModel
      cols: 'cols',
      rows: 'rows',
    },
    numberBoxOptions: {
      // bound to MyNumberBoxModel
      min: 'min',
      max: 'max',
    },
    selectBoxOptions: {
      // bound to MySelectBoxModel
      options: 'selectboxOptions',
      value: 'valueExpr',
      text: 'displayExpr',
      meta: 'meta',
    },
    radioGroupOptions: {
      // bound to MyRadioModel
      text: 'label',
      items: 'radioOptions',
      value: 'valueExpr',
      label: 'displayExpr',
    },
    validators: {
      // bound to MyValidatorModel
      propertyName: 'rules',
      name: 'name',
      value: 'value',
    },
  },
};
```

**3. Create an instance of the AutoMapperPlugin, pass in your questions, and the mapping profile. Lastly, run the plugin to get the generated data source**

```ts
const mapper = new AutoMapperPlugin<MyQuestionType>(questions, mappingProfile);
const dataSource = mapper.run();
```

**4. Pass in the data source to the form constructor**

```ts
const form = new Form({ dataSource }}
```

> See full implementation in the Examples section

### **Events (external)**

A flexible plugin that allows you to easily attach events to a form control

#### Usage

**1. Create an instance of the EventsPlugin**

```ts
const eventsPlugin = new EventsPlugin();
```

**2. Attach the event to any control by key**

```ts
eventsPlugin.run({
  targetKey: control.key,
  attachmentType: 'multiple',
  on: 'change',
  runFn: () => console.log(`Triggered`),
});
```

**Options**

| Name           | Type                               | Description                                                                                                     |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| targetKey      | string                             | Control key identifier                                                                                          |
| attachmentType | single - multiple                  | If control is composed of multiple child controls, you must specify multiple (eg. RadioGroup), otherwise single |
| on             | keyof HTMLElementEventMap          | Event name                                                                                                      |
| runFn          | (this: Element, ev: Event) => void | Event callback where you must write your custom logic                                                           |

> See full implementation in the Examples section

### **Validations (internal)**

This plugin will run inside the form to detect when it is invalid and change the `data-status` attribute depending on the validity status. It will also append the validation messages automatically in each control wrapper.

#### Usage

**1. Instantiate the Form class and pass in the ValidationsPlugin as argument**:

```ts
const form = new Form({
  someDataSource,
  plugins: [
    new ValidationsPlugin({
      messages: {
        required: 'Campo obligatorio',
        requiredTrue: 'Debe aceptar la política de tratamiento de datos',
        email: 'El correo electrónico es inválido',
        min: 'El valor {1} es incorrecto: mínimo permitido es {0}',
        max: 'El valor {1} es incorrecto: máximo permitido es {0}',
        minLength: 'longitud {1} es incorrecta: mínimo permitido es {0}',
        maxLength: 'longitud {1} es incorrecta: máximo permitido es {0}',
      },
    }),
  ],
});
```

**Options**

| Name          | Type                        | Description                                                      |
| ------------- | --------------------------- | ---------------------------------------------------------------- |
| parentElement | keyof HTMLElementTagNameMap | Parent HTML element that will be appended to the control wrapper |
| childElement  | keyof HTMLElementTagNameMap | Child HTML element that will be appended to the parent element   |
| messages      | ValidationMessages          | Global messages for each validation type                         |

**ValidationMessages options**

| Name         | Description                         | Format                                                       |
| ------------ | ----------------------------------- | ------------------------------------------------------------ |
| required     | Message for required validator      | N/A                                                          |
| requiredTrue | Message for required true validator | N/A                                                          |
| email        | Message for email validator         | N/A                                                          |
| min          | Message for min validator           | {0} to access current value, {1} to access established value |
| max          | Message for max validator           | {0} to access current value, {1} to access established value |
| minLength    | Message for minLength validator     | {0} to access current value, {1} to access established value |
| maxLength    | Message for maxLength validator     | {0} to access current value, {1} to access established value |

> See full implementation in the Examples section

### **Custom (external)**

You can easily create a plugin that extends the form functionality and solves a repetitive task that's not included by default; for this, there's a simple interface that you can implement in order to have some constraints inside your implementation.

**Usage**

To create a custom plugin you just need to define a new class and implement the FormPlugin interface

```ts
import { FormPlugin } from '@ekisa-cdk/forms';

export class SendEmailPlugin implements FormPlugin<YourConfigType> {
  run(input: YourConfigType): void {
    // your logic to send email after some event
  }
}
```

```ts
import { FormPlugin } from '@ekisa-cdk/forms';

export class CssPlugin implements FormPlugin<YourConfigType> {
  run(input: YourConfigType): void {
    // your logic to add css classes to elements
  }
}
```

## Theming

This library doesn't have any styling at all and that's intended since the design is expected to be fully customizable. Currently, there are two ways to design your form.

1. You can easily customize your form using the auto-generated data attributes explained in the data attributes section. [**See example**](https://github.com/Ekisa-Team/cdk/blob/main/examples/angular/src/app/forms/forms.component.css#L14)

2. You can create a custom plugin to add CSS classes to each element at rendering time.

## Examples

**[Angular](https://github.com/Ekisa-Team/cdk/blob/main/examples/angular/src/app/forms/forms.component.ts)**

## To do

### Create examples

    - [ ] Create vanilla example
    - [x] Create Angular example
    - [ ] Create Svelte example
    - [ ] Create Vue example
    - [ ] Create React example

## License

[MIT](./LICENSE) License © 2021 [Ekisa Team](https://github.com/Ekisa-Team/cdk)
