export class ValidationError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, ValidationError);
        console.log(args);
        this.name = 'ValidationError';
        this.statusCode = args[ 1 ] || 400;
        this.code = args[ 2 ] || 1;
    }
}

export class NotFoundError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NotFoundError);
        console.log(args);
        this.name = 'NotFoundError';
        this.statusCode = args[ 1 ] || 404;
    }
}
