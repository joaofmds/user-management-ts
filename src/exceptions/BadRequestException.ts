import { HttpException } from "./HttpExcelption";

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message)
  }
}