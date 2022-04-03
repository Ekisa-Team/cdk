import {
  CheckBox,
  DatePicker,
  FieldSet,
  NumberBox,
  RadioGroup,
  RadioGroupItem,
  SelectBox,
  SelectBoxOption,
  TextArea,
  TextBox,
  TimePicker,
} from '../controls';
import { FormPlugin } from '../plugins';
import { FormControlType } from '../types/form-control-type.enum';
import { FormControls } from '../types/form-control.type';
import { ValidatorFn, Validators } from '../validators';

type MappingSource = Array<Record<string, any>>;

type ControlPublicKeys = 'key' | 'value' | 'label' | 'placeholder' | 'validators';

type FieldsetPublicKeys = 'legend' | 'cols' | 'children';

type TextAreaPublicKeys = 'cols' | 'rows';

type NumberBoxPublicKeys = 'min' | 'max';

type SelectBoxPublicKeys = 'options' | keyof SelectBoxOption;

type RadioGroupPublicKeys = 'text' | 'items' | keyof RadioGroupItem;

export type AutoMapperPluginConfig<ControlType> = {
  types: Record<FormControlType, ControlType>;
  keys: {
    controlTypePropertyName: string;
    fieldSet: Record<FieldsetPublicKeys, string>;
    control: Record<ControlPublicKeys, string>;
    textAreaOptions: Record<TextAreaPublicKeys, string>;
    numberBoxOptions: Record<NumberBoxPublicKeys, string>;
    selectBoxOptions: Record<SelectBoxPublicKeys, string>;
    radioGroupOptions: Record<RadioGroupPublicKeys, string>;
    validators: {
      propertyName: string;
      name: string;
      value?: string;
    };
  };
};

export class AutoMapperPlugin<ControlType>
  implements FormPlugin<AutoMapperPluginConfig<ControlType>>
{
  private _source: MappingSource;
  private _config: AutoMapperPluginConfig<ControlType>;

  constructor(source: MappingSource, config: AutoMapperPluginConfig<ControlType>) {
    this._source = source;
    this._config = config;
  }

  run(): FormControls {
    const source = JSON.parse(JSON.stringify(this._source)) as MappingSource;
    return this._mapFromSource(source);
  }

  private _mapFromSource(source: MappingSource): FormControls {
    let controls: FormControls = [];
    const { keys } = this._config;

    for (const item of source) {
      const controlType = item[keys.controlTypePropertyName];

      switch (controlType) {
        case this._config.types['FieldSet']: {
          const control = new FieldSet({
            legend: item[keys.fieldSet.legend],
            cols: item[keys.fieldSet.cols],
            children: this._mapFromSource(item[keys.fieldSet.children]),
          });

          controls = [...controls, control];
          break;
        }
        case this._config.types['TextBox']: {
          const control = new TextBox(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            placeholder: item[keys.control.placeholder],
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['TextArea']: {
          const control = new TextArea(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            placeholder: item[keys.control.placeholder],
            cols: item[keys.textAreaOptions.cols],
            rows: item[keys.textAreaOptions.rows],
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['NumberBox']: {
          const control = new NumberBox(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            min: item[keys.numberBoxOptions.min],
            max: item[keys.numberBoxOptions.max],
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['SelectBox']: {
          const options: SelectBoxOption[] = (
            item[keys.selectBoxOptions.options] as Array<{ [x: string]: string }>
          ).map((o) => ({
            value: o[keys.selectBoxOptions.value],
            text: o[keys.selectBoxOptions.text],
            meta: o[keys.selectBoxOptions.meta],
          }));

          const control = new SelectBox(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            options,
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['CheckBox']: {
          const control = new CheckBox(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['RadioGroup']: {
          const items: RadioGroupItem[] = (
            item[keys.radioGroupOptions.items] as Array<{ [x: string]: string }>
          ).map((o) => ({
            value: o[keys.radioGroupOptions.value],
            label: o[keys.radioGroupOptions.label],
          }));

          const control = new RadioGroup(item[keys.control.value], {
            key: item[keys.control.key],
            text: item[keys.control.label],
            items,
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['DatePicker']: {
          const control = new DatePicker(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        case this._config.types['TimePicker']: {
          const control = new TimePicker(item[keys.control.value], {
            key: item[keys.control.key],
            label: item[keys.control.label],
            validators: this._mapValidators(item[keys.control.key], item[keys.control.validators]),
          });

          controls.push(control);
          break;
        }
        default: {
          throw new Error(`${item[keys.control.key]} -> ${controlType} was not recognized`);
        }
      }
    }

    return controls;
  }

  private _mapValidators(controlKey: string, rules: Array<any>): ValidatorFn[] {
    // Exit function if no validators are passed
    if (rules?.length === 0 || rules === null || rules === undefined) return [];

    // Check validators data structure to be an array
    if (!Array.isArray(rules))
      throw new Error(
        `${controlKey}: Invalid structure for validators. It must be an array of items`,
      );

    const { validators: validatorKeys } = this._config.keys;

    const validators: ValidatorFn[] = [];

    // Loop through each validator & append them to the validators array
    for (const rule of rules) {
      const ruleType = rule[validatorKeys['name']] as keyof typeof Validators;

      switch (ruleType) {
        case 'required':
          validators.push(Validators.required);
          break;
        case 'requiredTrue':
          validators.push(Validators.requiredTrue);
          break;
        case 'email':
          validators.push(Validators.email);
          break;
        case 'min': {
          const valueKey = validatorKeys['value'];
          if (!valueKey)
            throw new Error(`${controlKey}: a value must be provided for the min validator`);

          const value = rule[valueKey];
          if (typeof value !== 'number')
            throw new Error(`${controlKey}: type ${typeof value} is invalid for the min validator`);

          validators.push(Validators.min(value));
          break;
        }
        case 'max': {
          const valueKey = validatorKeys['value'];
          if (!valueKey)
            throw new Error(`${controlKey}: a value must be provided for the max validator`);

          const value = rule[valueKey];
          if (typeof value !== 'number')
            throw new Error(`${controlKey}: type ${typeof value} is invalid for the max validator`);

          validators.push(Validators.max(value));
          break;
        }
        case 'minLength': {
          const valueKey = validatorKeys['value'];
          if (!valueKey)
            throw new Error(`${controlKey}: a value must be provided for the minLength validator`);

          const value = rule[valueKey];
          if (typeof value !== 'number')
            throw new Error(
              `${controlKey}: type ${typeof value} is invalid for the minLength validator`,
            );

          validators.push(Validators.minLength(value));
          break;
        }
        case 'maxLength': {
          const valueKey = validatorKeys['value'];
          if (!valueKey)
            throw new Error(`${controlKey}: a value must be provided for the maxLength validator`);

          const value = rule[valueKey];
          if (typeof value !== 'number')
            throw new Error(
              `${controlKey}: type ${typeof value} is invalid for the maxLength validator`,
            );

          validators.push(Validators.maxLength(value));
          break;
        }
        default:
          // prettier-ignore
          throw new Error(`Invalid validator ${JSON.stringify(rule)} for "${controlKey}" control. The configured name is "${validatorKeys['name']}"`);
      }
    }

    return validators;
  }
}
