import { HttpException } from "./HttpExcelption";

export class UserNotFoundException extends HttpException {
  constructor() {
    super(404, 'User not found')
  }
}