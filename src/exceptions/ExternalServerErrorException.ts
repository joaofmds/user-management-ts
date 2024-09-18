import { HttpException } from "./HttpExcelption";

export class ExternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(500, message)
  }
}