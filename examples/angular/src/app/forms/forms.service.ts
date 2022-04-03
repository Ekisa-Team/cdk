import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoMapperPluginConfig } from '@ekisa-cdk/forms';
import { Observable } from 'rxjs';
import { MyFormModel, MyQuestionType } from './models/mock.model';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  get mappingProfile(): AutoMapperPluginConfig<MyQuestionType> {
    return {
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
        controlTypePropertyName: 'controlType',
        fieldSet: {
          legend: 'title',
          cols: 'columns',
          children: 'questions',
        },
        control: {
          key: 'dataField',
          value: 'value',
          label: 'label',
          placeholder: 'placeholder',
          validators: 'rules',
        },
        textAreaOptions: {
          cols: 'cols',
          rows: 'rows',
        },
        numberBoxOptions: {
          min: 'min',
          max: 'max',
        },
        selectBoxOptions: {
          options: 'selectboxOptions',
          value: 'valueExpr',
          text: 'displayExpr',
          meta: 'meta',
        },
        radioGroupOptions: {
          text: 'label',
          items: 'radioOptions',
          value: 'valueExpr',
          label: 'displayExpr',
        },
        validators: {
          propertyName: 'rules',
          name: 'name',
          value: 'value',
        },
      },
    };
  }

  constructor(private _httpClient: HttpClient) {}

  getFormData(db: string): Observable<MyFormModel> {
    return this._httpClient.get<MyFormModel>(`./assets/db/${db}.mock.json`);
  }
}
