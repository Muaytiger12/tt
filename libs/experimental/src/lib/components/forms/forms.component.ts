import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormRecord,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NameValidator } from '../../helpers/name.validator';
import { Features, MockService } from 'data-access';

enum RecevierType {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY',
}

interface Address {
  city?: string;
  street?: string;
  build?: number;
  apartment?: number;
}

function getArrayAddress(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    build: new FormControl<number | null>(initialValue.build ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

// function validateStartWith(letter: string): ValidatorFn {
//   return (control: AbstractControl) => {
//     return control.value.startsWith(letter)
//       ? { startsWith: `${letter} - не нравится буква,напиши другую` }
//       : null;
//   };
// }

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);
    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);
    if (fromDate && toDate && fromDate > toDate) {
      // toControl.setErrors({dateRange: {message: 'Неверный формат даты!'}});
      // fromControl.setErrors({dateRange: {message: 'Неверный формат даты!'}});
      return { dateRange: { message: 'Неверный формат даты!' } };
    }
    return null;
  };
}

@Component({
  selector: 'lib-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsComponent {
  mockService = inject(MockService);
  nameValidator = inject(NameValidator);
  features: Features[] = [];
  //TODO проверить чекбоксы,один не прогружается сразу
  constructor() {
    //Валидируем ИНН
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.form.controls.inn.clearValidators();
        if (value === 'COMPANY') {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });
    //Пушим моковые даннные адресов
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        // while(this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0);
        // }
        this.form.controls.addresses.clear();
        for (const addr of addrs) {
          this.form.controls.addresses.push(getArrayAddress(addr));
        }
        // this.form.controls.addresses.setValue(addrs)
        // this.form.controls.addresses.setControl(0,getArrayAddress(addrs[1]))
        // this.form.controls.addresses.at(0)
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;
        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });
  }

  RecevierType = RecevierType;
  form = new FormGroup({
    type: new FormControl<RecevierType>(RecevierType.PERSON),
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
    }),
    lastName: new FormControl<string>(''),
    inn: new FormControl<number | null>(null),
    addresses: new FormArray([getArrayAddress()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' })
    ),
  });

  onSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getArrayAddress());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
