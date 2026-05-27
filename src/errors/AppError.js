export class AppError extends Error{
    constructor(message,statuscode,errors){
        super(message);
        this.isOperational=true;
        this.statuscode=statuscode;
        this.status=`${statuscode}`.startsWith('4')?"Fail":"Error";
        this.error=errors;
        Error.captureStackTrace(this,this.constructor);
    }
}
