import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  AutoMapperPlugin,
  EventsPlugin,
  Form,
  ValidationsPlugin,
} from '@ekisa-cdk/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormsService } from './forms.service';
import { MyFormModel, MyQuestionType } from './models/mock.model';

@Component({
  template: `
    <div #formContainer></div>
    <div class="actions-container">
      <button class="btn" (click)="handleSaveClick()">Save</button>
    </div>
  `,
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('formContainer') formContainer!: ElementRef<HTMLDivElement>;

  questions$!: Observable<MyFormModel>;
  destroy$ = new Subject();

  submitted = false;

  private _form!: Form;

  constructor(private formsService: FormsService) {}

  ngOnInit(): void {
    this.questions$ = this.formsService.getFormData('activity');
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.questions$
      .pipe(takeUntil(this.destroy$))
      .subscribe((questions) => this._initializeForm(questions));
  }

  handleSaveClick() {
    this.submitted = true;

    const errors = this._form.validate();

    if (errors === null) {
      console.log(this._form.toJSON());
    }
  }

  /**
   * Setup dynamic form initialization
   */
  private _initializeForm(questions: MyFormModel) {
    console.time('form_initialization');

    const mapper = new AutoMapperPlugin<MyQuestionType>(
      questions,
      this.formsService.mappingProfile,
    );

    const dataSource = mapper.run();

    this._form = new Form({
      dataSource,
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
    this._form.render(this.formContainer.nativeElement);
    this._initializeValidationEvents();

    console.timeEnd('form_initialization');

    console.log(this._form.controls.length);
  }

  /**
   * Setup validation event when the form control value changes
   */
  private _initializeValidationEvents() {
    if (!this._form) throw new Error(`Form is not defined or hasn't been instantiated`);

    const eventsPlugin = new EventsPlugin();

    this._form.controls.forEach((control) => {
      if (control.type === 'RadioGroup') {
        eventsPlugin.run({
          targetKey: control.key,
          attachmentType: 'multiple',
          on: 'change',
          runFn: () => this._checkControlValidity(control),
        });
      } else if (control.type === 'TextBox' || control.type === 'TextArea') {
        eventsPlugin.run({
          targetKey: control.key,
          attachmentType: 'single',
          on: 'keyup',
          runFn: () => this._checkControlValidity(control),
        });
      } else {
        eventsPlugin.run({
          targetKey: control.key,
          attachmentType: 'single',
          on: 'change',
          runFn: () => this._checkControlValidity(control),
        });
      }
    });
  }

  private _checkControlValidity(control: AbstractControl) {
    if (!this.submitted) return;
    const errors = this._form.validateControl(control.key);

    if (errors === null) {
      const parent = control.getParentElement()!;
      parent.dataset['status'] = 'valid';
    }
  }
}
