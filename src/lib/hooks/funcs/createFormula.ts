import { Form, InitState } from "../Formula";

const createFormula = <T extends InitState>(initialState: T): Form<T> => {
  let store = initialState;
  const callbacks = new Set<() => void>();
  const getStore = () => store;

  const setStore = (nextState: T) => {
    store = { ...store, ...nextState };
    callbacks.forEach((callback) => callback());
  };

  const subscribe = (callback: () => void) => {
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  };

  return { getStore, setStore, subscribe };
};
export default createFormula;
