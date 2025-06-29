import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  input,
  signal
} from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'lib-stack-input',
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgComponent, FormsModule, AsyncPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})
export class StackInputComponent implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([]);
  #disabled = false;

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled;
  }

  innerInput = '';

  @HostListener('keydown.enter',['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.innerInput) return;
    this.value$.next([...this.value$.value, this.innerInput]);
    this.innerInput = '';
    this.onChange(this.value$.value);
  }

  writeValue(stack: string[] | null): void {
    if (!stack) return this.value$.next([]);
    this.value$.next(stack);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.#disabled= isDisabled;
  }
  onChange(value: string[] | null) {

  }
  onTouched(fn: any) {}

  onTagDelete(stackIndex: number) {
    const tag = this.value$.value;
    tag.splice(stackIndex, 1);
    this.value$.next(tag);
    this.onChange(this.value$.value);
  }
}
