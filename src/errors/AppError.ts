export class AppError extends Error{
    public isOperational :boolean;
    public statuscode :number;
    public status:"Fail"|"Error";
    public error:string|null;
    constructor(message:string,statuscode:number,errors:string|null){
        super(message);
        this.isOperational=true;
        this.statuscode=statuscode;
        this.status=`${statuscode}`.startsWith('4')?"Fail":"Error";
        this.error=errors;
        Error.captureStackTrace(this,this.constructor);
    }
}
