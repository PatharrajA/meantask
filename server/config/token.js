var token = function () {
    createJwt = function (user) {
        var payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.secret);
    };

    ensureAuthenticated = function (userToken) {
        if (!userToken) {
            return {
                success: false
            };
        }

        var token = userToken.split(' ')[1],
            payload = null;

        try {
            payload = jwt.decode(token, config.secret);
        } catch (err) {
            return {
                message: err.message
            };
        }

        if (payload.exp <= moment().unix()) {
            return {
                success: false
            };
        }
        
        return {
            success: true,
            user:payload.sub
        };
    }
    return {
        createJwt: createJwt,
        ensureAuthenticated: ensureAuthenticated
    }
}();

module.exports = token;