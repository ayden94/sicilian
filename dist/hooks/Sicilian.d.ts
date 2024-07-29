/// <reference types="react" />
import { InitState, Validator } from "./Types";
export declare const Sicilian: <T extends InitState>(initValue: T) => {
    initValue: T;
    register: import("./Types").Register<T[keyof T]>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => void) => (e: import("react").FormEvent<Element>) => void;
    setValue: (asyncState: { [key in keyof T]?: string | undefined; }) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<T[keyof T], import("./Types").RegisterErrorObj<T[keyof T]>>>;
};
