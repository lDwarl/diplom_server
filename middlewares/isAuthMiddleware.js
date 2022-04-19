const ApiError = require('../exceptions/ApiError');
const TokenService = require('../services/tokenService');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw ApiError.unauthorized();
        }

        const token = authHeader.split(' ').pop();

        const userData = TokenService.validateAccessToken(token);

        if (!userData) {
            throw ApiError.unauthorized();
        }

        req.user = userData;

        next();
    } catch (e) {
        next(ApiError.unauthorized())
    }
};
