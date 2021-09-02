export class ApplicationErrors extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  get name() {
    return this.constructor.name;
  }

  get status() {
    return this.statusCode;
  }
}