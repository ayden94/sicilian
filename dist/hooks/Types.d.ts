import { ChangeEvent, Context, FocusEvent, FormEvent } from "react";
type Roll<T> = {
    [K in keyof T]: T[K];
} & {};
type Key = string | number | symbol;
export type Input<K> = Roll<ChangeEvent<HTMLInputElement> & {
    target: {
        name: K;
        value: string;
    };
}>;
export type InitState = {
    [key in Key]: string;
};
export type SetStore = <K extends string>(action: {
    [key in K]: string;
}) => void;
export type CreateFormState = <T extends InitState>(initialState: T) => Store<T>;
export type Store<T extends InitState> = {
    getStore: () => T;
    setStore: (action: SetStore) => void;
    subscribe: (callback: () => void) => () => void;
};
export type UseRegister = <T extends InitState>(From: Context<Store<T>>, Error: Context<Store<T>>) => Register<keyof T>;
export type Register<K extends Key> = (name: K, ErrorObj?: RegisterErrorObj<K>) => {
    value: string;
    name: K;
    onChange: ReturnType<RegistOnChange<K>>;
    onBlur: ReturnType<RegistOnBlur>;
    onFocus: RegistOnFocus;
};
export type Validator<T extends InitState> = Partial<Record<keyof T, RegisterErrorObj<keyof T>>>;
export type RegisterErrorObj<K extends Key> = {
    required?: {
        required: true;
        message: string;
    } | true;
    minLength?: {
        number: number;
        message: string;
    } | number;
    maxLength?: {
        number: number;
        message: string;
    } | number;
    RegExp?: RegExpErrorObj | Array<RegExpErrorObj>;
    customChecker?: CustomCheckerErrorObj<K> | Array<CustomCheckerErrorObj<K>>;
};
export type RegExpErrorObj = {
    RegExp: RegExp;
    message?: string;
};
export type CustomCheckerErrorObj<K extends Key> = {
    checkFn: (store: Record<K, string>) => boolean;
    message?: string;
};
export type RegistOnChange<K extends Key> = (setStore: (action: SetStore) => void) => (e: Input<K>) => void;
export type RegistOnBlur = <K extends Key>(onBlurProps: OnBlurProps<K>) => (e: FocusEvent<HTMLInputElement>) => void;
type OnBlurProps<K extends Key> = {
    store: Record<K, string>;
    ErrorObj?: RegisterErrorObj<K>;
    value: string;
    setError: (action: SetStore) => void;
};
export type RegistOnFocus = (e: FocusEvent<HTMLInputElement>) => void;
export type UseContextState = <T extends InitState>(context: Context<Store<T>>) => T;
export type RegistOnSubmit = <T extends InitState>(FormState: () => T, ErrorState: () => T) => (fn: (data: T) => Promise<void>) => (e: FormEvent) => void;
export type RegistOnValue = <T extends InitState>(setState: (action: SetStore) => void) => (asyncState: {
    [key in keyof T]?: string;
}) => void;
export {};
