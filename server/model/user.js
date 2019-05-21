var user = function () {
    var userModel = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            unique: true
        },
        avatar: {
            type: String,
            default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        organisation: {
            type: String,
            required: true
        },
        userRole: {
            type: String,
            required: true,
            default: 'User'
        }

    });

    userModel.methods.comparePassword = function (password, callback) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return callback(err, null);
            } else {
                callback(null, isMatch);
            }
        });
    };

    userModel.pre('save', function (next) {
        var user = this;
        if (user.isModified('password')) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                } else {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            return next(err);
                        } else {
                            user.password = hash;
                            next();
                        }
                    });
                }
            });
        } else {
            return next();
        }
    });

    _userModel = mongoose.model('User', userModel);


   

    var result_obtained = "",
        error_obtained = "";

    /**
     * Authenticate a User via Email and Password
     * @param  req
     * @param  res
     * @return json
     */
    _login = function (jsonData, callback) {
        _userModel.findOne({
            "email": jsonData.email
        }, function (err, user) {
            if (!err) {
                if (user) {
                    user.comparePassword(jsonData.password, function (err, isMatch) {
                        if (!err && isMatch) {
                            user = user.toObject();
                            delete user.password;
                            var user_token = token.createJwt(user);
                            result_obtained = {
                                code: 200,
                                user: user,
                                token: user_token,
                                message: message.success.login,
                                success: true
                            };
                            callback(null, result_obtained);
                        } else {
                            error_obtained = {
                                code: 204,
                                error: err,
                                message: message.error.password,
                                success: false
                            };
                            callback(error_obtained, null);
                        }
                    });
                } else {
                    error_obtained = {
                        code: 204,
                        error: err,
                        message: message.error.user,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            } else {
                error_obtained = {
                    code: 204,
                    error: err,
                    message: message.error.user,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    };

    /**
     * Create a User via Email and Password
     * @param  req
     * @param  res
     * @return json
     */
    _register = function (jsonData, callback) {
        var newUser = new _userModel(jsonData);
        newUser.save(function (err, user) {
            if (!err) {
                var user_token = token.createJwt(user);
                user = user.toObject();
                delete user.password;
                result_obtained = {
                    user: user,
                    token: user_token,
                    message: message.success.register,
                    code: 201,
                    success: true
                }
                callback(null, result_obtained);
            } else {
                error_obtained = {
                    code: 204,
                    error: err,
                    message: message.error.existing_user,
                    success: false
                }
                callback(error_obtained, null);
            }
        });
    };


    /**
     * Get Authenticated User
     * @param  req
     * @param  res
     * @return json
     */
    _getUser = function (user_id, callback) {
        _userModel.findById(user_id, function (err, user) {
            if (!err) {
                result_obtained = {
                    user: user,
                    message: message.success.user,
                    code: 200
                };
                callback(null, result_obtained);
            } else {
                error_obtained = {
                    code: 204,
                    error: err,
                    message: message.error.user,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    };

    return {
        userModel: _userModel,
        login: _login,
        register: _register,
        getUser: _getUser
    }

}();

module.exports = user;