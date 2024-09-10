"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registOnSubmit = (FormState, ErrorState, clearForm) => (fn) => async (e) => {
    e.preventDefault();
    const formState = FormState();
    const errorState = ErrorState();
    // 에러가 하나라도 있으면 return
    for (const v of Object.values(errorState)) {
        if (v !== "")
            return;
    }
    // 모든 value가 비어있으면 return
    let count = 0;
    let length = 0;
    for (const v of Object.values(formState)) {
        if (v === "")
            count++;
        length++;
    }
    if (count === length)
        return;
    try {
        fn(formState);
        clearForm();
    }
    catch (e) {
        console.log(e);
    }
};
exports.default = registOnSubmit;
