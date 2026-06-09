import { AppError } from "./AppError";
export class Unauthorized extends AppError{
    constructor(message="Unauthorized",errors:string|null){
        super(message,401,errors);
    }
}