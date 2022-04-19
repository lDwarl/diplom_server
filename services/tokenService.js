const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '7d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();