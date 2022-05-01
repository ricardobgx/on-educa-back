export class ApplicationErrors {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
  }

  get name() {
    return this.constructor.name;
  }

  get status() {
    return this.statusCode;
  }
}