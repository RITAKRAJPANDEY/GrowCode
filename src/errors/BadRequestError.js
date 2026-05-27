import { AppError } from "./AppError";
export class BadRequestError extends AppError{
    constructor(message,errors){
        super(message,400,errors);
    }
}