import { AppError } from "./AppError";
export class ConflictError extends AppError{
    constructor(message,errors){
        super(message,409,errors);
    }
}