export enum ActionTypes {
  ADD_NUMBER = "ADD_NUMBER"
}

export interface ActionInterface<T> {
  type: ActionTypes,
  payload: T
}

export function addNumber(num:number):ActionInterface<number>{
return {
  type: ActionTypes.ADD_NUMBER,
  payload: num
}
}
