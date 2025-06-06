import type { InitState, RegisterErrorObj } from "../../../type";
import { isArray } from "../../../utils/typeGuard/isArray";
import { isNumber } from "../../../utils/typeGuard/isNumber";

type HandleMethodProps<T extends InitState> = {
  name: string,
  value: string,
  checked?: boolean,
  ErrorObj: RegisterErrorObj<T>,
  store: T
};

export interface IHandler<T extends InitState> {
  handle(props: HandleMethodProps<T>): string | null;
}

export class RequiredHandler<T extends InitState> implements IHandler<T> {
  public handle({ErrorObj, value, name}: HandleMethodProps<T>) {
    // required가 false이거나 value가 비어있지 않으면 null을 반환
    if (!ErrorObj.required || value.length !== 0) return null;

    const message = typeof ErrorObj.required === "object"
    ? ErrorObj.required!.message
    : `${name}는 비어있을 수 없습니다.`

    return message;
  }
}

export class CheckedHandler<T extends InitState> implements IHandler<T> {
  public handle({ErrorObj, checked, name}: HandleMethodProps<T>) {
    // checked가 false이거나 value가 비어있지 않으면 null을 반환
    if (!ErrorObj.checked) return null;

    if (!checked) {
      return typeof ErrorObj.checked === "boolean" ? `${name}는 체크되어야 합니다.` : ErrorObj.checked.message;
    }

    return null
  }
}

export class MinLengthHandler<T extends InitState> implements IHandler<T> {
  public handle({value, ErrorObj, name}: HandleMethodProps<T>) {
    if (isNumber(ErrorObj.minLength!)) {
      if (value.length < ErrorObj.minLength!) {
        return `${name}는 ${ErrorObj.minLength!}자 이상이어야 합니다.`;
      }
    } else {
      if (value.length < ErrorObj.minLength!.number) {
        return ErrorObj.minLength!.message ?? `${name}는 ${ErrorObj.minLength!.number}자 이상이어야 합니다.`
      }
    }

    return null
  }
}

export class MaxLengthHandler<T extends InitState> implements IHandler<T> {
  public handle({value, ErrorObj, name}: HandleMethodProps<T>) {
    if (isNumber(ErrorObj.maxLength!)) {
      if (value.length > ErrorObj.maxLength!) {
        return `${name}는 ${ErrorObj.maxLength!}자 이하여야 합니다.`;
      }
    } else {
      if (value.length > ErrorObj.maxLength!.number) {
        return ErrorObj.maxLength!.message ?? `${name}는 ${ErrorObj.maxLength!.number}자 이하여야 합니다.`
      }
    }

    return null
  }
}

export class RegExpHandler<T extends InitState> implements IHandler<T> {
  public handle({value, ErrorObj, name}: HandleMethodProps<T>) {
    if (isArray(ErrorObj.RegExp!)) {
      for (const RegExp of ErrorObj.RegExp!) {
        if (!RegExp.RegExp.test(value)) {
          return RegExp.message ?? `${name}의 값이 정규표현식을 만족하지 않습니다.`
        }
      }
    } else {
      if (!ErrorObj.RegExp!.RegExp.test(value)) {
        return ErrorObj.RegExp!.message ?? `${name}의 값이 정규표현식을 만족하지 않습니다.`
      }
    }

    return null
  }
}

export class CustomHandler<T extends InitState> implements IHandler<T> {
  public handle({value, ErrorObj, checked, name, store}: HandleMethodProps<T>) {
    if (!store) return null;

    if (isArray(ErrorObj.custom!)) {
      for (const customChecker of ErrorObj.custom!) {
        if (!customChecker.checkFn(value, store, checked)) {
          return customChecker.message ?? `${name}의 값이 검증 함수를 만족하지 않습니다.`
        }
      }
    } else {
      if (!ErrorObj.custom!.checkFn(value, store, checked)) {
        return ErrorObj.custom!.message ?? `${name}의 값이 검증 함수를 만족하지 않습니다.`
      }
    }

    return null
  }
}
