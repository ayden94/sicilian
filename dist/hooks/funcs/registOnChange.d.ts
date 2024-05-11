import { ChangeEvent } from "react";
import { InitState } from "../Formula";
declare const registOnChange: <T extends InitState>(setStore: (action: T) => void) => (e: ChangeEvent<HTMLInputElement>) => void;
export default registOnChange;