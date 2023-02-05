export class CustomError {
  message!: string;
  status!: number;
  stack!: unknown;

  constructor(message: string, status = 500, stack: unknown = {}) {
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
}
