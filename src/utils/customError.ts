export default class CustomError extends Error {
    statusCode?: number;
    path?: string | undefined;
    value?: string | undefined;
    errors?: any;
    fields?: any;
    table?: any;
  
    constructor(message: string, statusCode?: number, path?: string, value?: string) {
      super(message);
      this.statusCode = statusCode;
      this.path = path;
      this.value = value;
    }
  }