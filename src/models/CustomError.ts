export class CustomError {
  message!: string;
  status!: number;
  data!: unknown;

  constructor(message: string, status = 500, data: unknown = {}) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}
