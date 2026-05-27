import { AppError } from "./AppError";
export class Unauthorized extends AppError{
    constructor(message="Unauthorized"){
        super(message,401);
    }
}