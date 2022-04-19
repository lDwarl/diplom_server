module.exports = class ApiError extends Error {
    errorType = 'ApiError';
    status;
    errors;

    constructor(message, status, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message, errors = []) {
        return new ApiError(message, 400, errors);
    }

    static missingParams(errors = {}) {
        const message = 'Missing required function params!';
        return new ApiError(message, 400, errors);
    }

    static alreadyExists(message) {
        return new ApiError(message, 403);
    }

    static notFound(message) {
        return new ApiError(message, 404);
    }

    static forbidden() {
        return new ApiError('Forbidden!', 403);
    }

    static unauthorized() {
        return new ApiError('Unauthorized!', 401);
    }
}
