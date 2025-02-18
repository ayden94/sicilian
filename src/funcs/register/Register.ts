import { useEffect } from "react";
import type { ExtractKeys, InitState, IStore, SicilianEvent } from "../../type";
import type { IRegisterOnBlur } from "./RegisterOnBlur";
import type { IRegisterOnChange } from "./RegisterOnChange";
import type { IRegisterOnFocus } from "./RegisterOnFocus";

export interface IRegister<T extends InitState> {
  onChange: (e: SicilianEvent) => void
  onFocus: (e: SicilianEvent) => void
  onBlur: (e: SicilianEvent) => void
  name: ExtractKeys<T> | string
  id: ExtractKeys<T> | string
  type: HTMLInputElement["type"]
  value?: string
  checked?: boolean
}

export class Register<T extends InitState> implements IRegister<T> {
  #RegisterOnChange: IRegisterOnChange
  #RegisterOnFocus: IRegisterOnFocus
  #RegisterOnBlur: IRegisterOnBlur
  public value?: string
  public checked?: boolean

  constructor(
    RegisterOnChange: IRegisterOnChange,
    RegisterOnFocus: IRegisterOnFocus,
    RegisterOnBlur: IRegisterOnBlur,
    public name: ExtractKeys<T> | string,
    public id: ExtractKeys<T> | string,
    public type: HTMLInputElement["type"] = "text",
    setStore: IStore<T>["setStore"],
    value: T[ExtractKeys<T>],
  ) {
    this.#RegisterOnChange = RegisterOnChange
    this.#RegisterOnFocus = RegisterOnFocus
    this.#RegisterOnBlur = RegisterOnBlur

    useEffect(() => {
      setStore({ [name]: value } as unknown as Partial<T>)
    }, [])

    if (type === "checkbox") {
      this.checked = value as boolean
    } else if (type === "radio") {
      this.checked = value as boolean
    } else if (type === "file") {
  
    } else {
      this.value = value as string
    }
  }

  public onChange = (e: SicilianEvent) => {
    this.#RegisterOnChange.onChange(e)
  }

  public onFocus = (e: SicilianEvent) => {
    this.#RegisterOnFocus.onFocus(e)
  }

  public onBlur = (e: SicilianEvent) => {
    this.#RegisterOnBlur.onBlur(e)
  }
}
