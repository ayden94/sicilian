/// <reference types="react" />
import { InitState, Validator } from "./Types";
export declare const Sicilian: <T extends InitState>(initialState: T) => {
    register: import("./Types").Register<keyof T>;
    FormState: () => T;
    ErrorState: () => T;
    handleSubmit: (fn: (data: T) => Promise<void>) => (e: import("react").FormEvent<Element>) => void;
    setValue: (asyncState: { [key in keyof T]?: string | undefined; }) => void;
    handleValidate: (validator: Validator<T>) => Partial<Record<keyof T, import("./Types").RegisterErrorObj>>;
};
