export class AppError {
    
    message:any;
    statusCode:any;

    constructor(message:any, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }

}