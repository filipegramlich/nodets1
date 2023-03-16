export class AppError {

    public message: any;
    public statusCode: any;

    constructor(message: any, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }

}