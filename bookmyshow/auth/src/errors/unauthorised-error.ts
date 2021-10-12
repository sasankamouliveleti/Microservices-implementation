import { CustomError } from "./custom-error";

export class UnauthorisedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorisedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
