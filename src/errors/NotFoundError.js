import { AppError } from "./AppError";
export class NotFoundError extends AppError{
    constructor(message,errors){
        super(message,404,errors);
    }
}