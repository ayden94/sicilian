import type { InitState, SicilianEvent } from "../types";

export type Validator<T extends InitState> = Partial<Record<keyof T, RegisterErrorObj<T>>>;

export type RegisterErrorObj<T extends InitState> = {
  required?: { required: boolean; message: string } | boolean;
  minLength?: { number: number; message: string } | number;
  maxLength?: { number: number; message: string } | number;
  RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
  custom?: CustomCheckerErrorObj<T> | Array<CustomCheckerErrorObj<T>>;
};

type RegExpErrorObj = { RegExp: RegExp; message?: string };
type CustomCheckerErrorObj<T extends InitState> = {
  checkFn: (value: string, store: T) => boolean;
  message?: string;
};

export type ExecValidate = <T extends InitState>(onBlurProps: {
  getStore: () => T;
  setError: (action: Partial<T>) => void;
  getErrorObjStore: () => Partial<T>;
}) => (e: SicilianEvent) => void;
