
import type { InitState, RegisterErrorObj } from "../../../type";
import type { IHandler } from "./Handler";

export class HandlerChain<T extends InitState> {
  private handlers: Array<IHandler<T>> = []
  constructor(private setError: (action: Partial<T> & { [x: string]: string | boolean | FileList }) => void) {}

  public addHandler(handler: IHandler<T>): void {
    this.handlers.push(handler);
  }

  public doHandle(props: {value: string, name: string, checked?:boolean, ErrorObj: RegisterErrorObj<T>, store: T}): void {
    for (const handler of this.handlers) {
      const handled = handler.handle(props);

      if (handled) {
        this.setError({[props.name]: handled} as Partial<T> & { [x: string]: string | boolean | FileList });

        break;
      }
    }
  }
}