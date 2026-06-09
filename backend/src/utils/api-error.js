class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static internalError(message = "Internal Server Error") {
        return new ApiError(500, message);
    }

    static unauthorized(message = "Unauthorized Request ! ") {
        return new ApiError(401, message);
    }

    static fields(message = "Insufficient credentials !") {
        return new ApiError(409, message);
    }

    static notFound(message = "Not Found !") {
        return new ApiError(404, message);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(400, message);
    }

    static conflict(message = "Conflict") {
        return new ApiError(409, message);
    }
}

export default ApiError;
