import { AppError } from "./AppError";
export class BadRequestError extends AppError{
    constructor(message:string,errors?:string|null){
        super(message,400,errors);
    }
}