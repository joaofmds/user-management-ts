import { HttpException } from "./HttpExcelption";

export class TypeErrorException extends HttpException {
  constructor(message: string) {
    super(400, message)
  }
}