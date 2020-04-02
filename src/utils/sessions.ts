import { IApplication } from '@/interfaces/IApplication';
import validate = WebAssembly.validate;

let setNameStorage = 'test-task';

  let setterStorage = (value: string, data:IApplication[]): (void) => {
    window.sessionStorage.setItem(value, JSON.stringify(data))
  };

let getterStorage = (value: string): {value: string; data:IApplication} | (null) => {
  let item = window.sessionStorage.getItem(value);
  if (item === null) {
   return null;
  } else {
   return { value, data: JSON.parse(item) };
  }
};

let unmountItemStorage = (value: string): (void) => {
  window.sessionStorage.removeItem(value);
};

let onLoadingHandlerEvent = function(store: any, valueSave: string, callerFunction: Function): void | bolean {
  let data = store.state.project;
  callerFunction.call(null, valueSave, data);
};
export {
  setNameStorage,
  getterStorage,
  setterStorage,
  unmountItemStorage,
  onLoadingHandlerEvent
};
