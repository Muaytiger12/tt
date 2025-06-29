import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject, signal
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DataService } from './dadata.service';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DadataSuggestions } from './dadata.interfaces';


@Component({
  selector: 'lib-address-input',
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe],
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();

  addressForm = new FormGroup({
    city:new FormControl(''),
    street:new FormControl(''),
    building:new FormControl('')
  });
  #dadatsService = inject(DataService);
  isDropdownOpened = signal<boolean>(false);



  suggestion$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(700),
    switchMap((value) => {
      return this.#dadatsService.getSuggection(value).pipe(tap(res => {
        if(res) {
          this.isDropdownOpened.set(true)
        }
      }));
    })
  );
  writeValue(city: string | null): void {
this.innerSearchControl.patchValue(city, {emitEvent: false});

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
  onChange(value: any): void {

  }
  onTouched(fn: any): void {}

  onSuggestionPick(suggest:DadataSuggestions){
    this.isDropdownOpened.set(false);
    // this.innerSearchControl.patchValue(city, {emitEvent: false});
// this.onChange(city);

    this.addressForm.patchValue({
      city: suggest.data.city,
      street:suggest.data.street,
      building:suggest.data.house
    })

  }
}
