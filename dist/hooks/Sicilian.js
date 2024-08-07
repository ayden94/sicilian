"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sicilian = void 0;
const react_1 = require("react");
const useRegister_1 = __importDefault(require("./funcs/useRegister"));
const useContextState_1 = __importDefault(require("./funcs/useContextState"));
const registOnSubmit_1 = __importDefault(require("./funcs/registOnSubmit"));
const createFormStore_1 = __importDefault(require("./funcs/createFormStore"));
const asyncSetValue_1 = __importDefault(require("./funcs/asyncSetValue"));
const Sicilian = (initValue) => {
    const FormStore = (0, createFormStore_1.default)(initValue);
    const ErrorStore = (0, createFormStore_1.default)(initValue);
    const Form = (0, react_1.createContext)(FormStore);
    const Error = (0, react_1.createContext)(ErrorStore);
    const register = (0, useRegister_1.default)(Form, Error);
    const FormState = () => (0, useContextState_1.default)(Form);
    const ErrorState = () => (0, useContextState_1.default)(Error);
    const setValue = (0, asyncSetValue_1.default)(FormStore.setStore);
    const handleSubmit = (0, registOnSubmit_1.default)(FormStore.getStore, ErrorStore.getStore);
    const handleValidate = (validator) => {
        return validator;
    };
    return { initValue, register, FormState, ErrorState, handleSubmit, setValue, handleValidate };
};
exports.Sicilian = Sicilian;
