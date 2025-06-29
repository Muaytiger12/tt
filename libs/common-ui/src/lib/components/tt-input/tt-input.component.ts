import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'lib-tt-input',
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TtInputComponent),
      multi: true,
    },
  ],
  imports: [FormsModule,CommonModule],
})
export class TtInputComponent implements ControlValueAccessor {
  type = input<'text' | 'password'>('text');
  placeholder = input<string>();

  onChange:any;
  onTouched:any;
  value:  string | null = null


  writeValue(val: string | null): void {
this.value = val;

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onModelChange(val: string | null): void {
this.onChange(val);

  }
}
