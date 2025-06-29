import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ActionInterface, ActionTypes } from './action';

export interface State {
  num: BehaviorSubject<number>
}

@Injectable({
  providedIn: 'root',
})
export class ExStore implements State {
  num = new BehaviorSubject<number>(0);
actionsStream$ = new Subject<ActionInterface<unknown>>();

  dispatch<T>(action: ActionInterface<T>){
this.actionsStream$.next(action)
  }

  select(key: keyof State ){
return this[key].asObservable()
  }
  init(){
    return this.actionsStream$.asObservable()
      .pipe(
        tap(action => {
          switch (action.type){
            case ActionTypes.ADD_NUMBER: this.num.next(this.num.value + (action.payload as number))
          }
        })
      )
  }
}
