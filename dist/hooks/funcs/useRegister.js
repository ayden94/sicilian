"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const registOnChange_1 = __importDefault(require("./registOnChange"));
const registOnBlur_1 = __importDefault(require("./registOnBlur"));
const useRegister = (Form, Error) => (name, ErrorObj) => {
    const { getStore, setStore, subscribe } = (0, react_1.useContext)(Form);
    const { setStore: setError } = (0, react_1.useContext)(Error);
    const selector = (store) => store[name];
    const value = (0, react_1.useSyncExternalStore)(subscribe, () => selector(getStore()), () => selector(getStore()));
    const store = (0, react_1.useSyncExternalStore)(subscribe, getStore, getStore);
    const onChange = (0, registOnChange_1.default)(setStore);
    const onFocus = (e) => {
        // @ts-ignore
        setError({ [e.target.name]: "" });
    };
    const onBlur = (0, registOnBlur_1.default)({
        ErrorObj,
        value,
        store,
        setError,
    });
    return { value, onChange, onBlur, onFocus, name };
};
exports.default = useRegister;
