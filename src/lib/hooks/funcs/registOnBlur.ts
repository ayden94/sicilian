import { InitState, RegistOnBlur } from "../Types";

const isArray = <T extends object>(thing: T | Array<T>): thing is Array<T> => {
  return "at" in thing;
};

const registOnBlur: RegistOnBlur =
  ({ ErrorObj, value, setError }) =>
  (e) => {
    if (ErrorObj) {
      for (const v in ErrorObj) {
        let flag = 0;

        switch (v) {
          case "required":
            if (!value.length) {
              setError({ [e.target.name]: ErrorObj[v]!.message } as InitState);
              flag++;
            }
            break;

          case "minLength":
            if (value.length < ErrorObj[v]!.number) {
              setError({ [e.target.name]: ErrorObj[v]!.message } as InitState);
              flag++;
            }
            break;

          case "maxLength":
            if (value.length > ErrorObj[v]!.number) {
              setError({ [e.target.name]: ErrorObj[v]!.message } as InitState);
              flag++;
            }
            break;

          case "RegExp":
            if (isArray(ErrorObj.RegExp!)) {
              for (const RegExp of ErrorObj.RegExp!) {
                if (!value.match(RegExp.RegExp)) {
                  setError({ [e.target.name]: RegExp.message } as InitState);
                  flag++;

                  if (flag === 1) break;
                }
              }
            } else {
              if (!value.match(ErrorObj.RegExp!.RegExp)) {
                setError({ [e.target.name]: ErrorObj.RegExp!.message } as InitState);
                flag++;
              }
            }
            break;

          case "customChecker":
            if (isArray(ErrorObj.customChecker!)) {
              for (const customChecker of ErrorObj.customChecker!) {
                if (customChecker.checkFn(value)) {
                  setError({ [e.target.name]: customChecker.message } as InitState);
                  flag++;
                }
              }
            } else {
              if (ErrorObj.customChecker!.checkFn(value)) {
                setError({ [e.target.name]: ErrorObj.customChecker!.message } as InitState);
                flag++;
              }
            }
            break;

          default:
            break;
        }

        if (flag === 1) break;
      }
    }
  };

export default registOnBlur;
