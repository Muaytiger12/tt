import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { addNumber, ExStore } from '../../store';
import { AsyncPipe } from '@angular/common';
import { map, MonoTypeOperatorFunction, Observable, OperatorFunction, scan, timer } from 'rxjs';


function squaring():OperatorFunction<number,number> {
return (source) => {
  return new Observable((observer) => {
    return source.subscribe({
      next: (val: number) => observer.next(Math.pow(val,2)),
      error: (error: any) => observer.error(error),
      complete: () => observer.complete()
    });
  })
}
}


function customMap<T,K>(mapper: (val:T) => K):OperatorFunction<T,K>{

  return (source) => {
    return new Observable((observer) => {
      return source.subscribe({
      // @ts-ignore
        next: (val: number) => observer.next(mapper(val)),
        error: (error: any) => observer.error(error),
        complete: () => observer.complete()
      });
    })
  }
}

@Component({
  selector: 'lib-counter',

  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})

export class CounterComponent {
  store = inject(ExStore);
  num$ = this.store.select('num');

constructor() {
  timer(0,1000).pipe(  customMap(val => val * 2),
    squaring()

  ).subscribe(val => console.log(val));

}



  increment(value: number) {
    this.store.dispatch(addNumber(value));
  }


}
