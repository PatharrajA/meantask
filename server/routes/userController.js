router.route('/login').post(function (req, res) {
    try {
        userController.login(req.body, function (err, user) {
            if (!err) {
                res.send(user);
            } else {
                res.send(err);
            }
        });
    } catch (err) {
        res.send({
            err: err,
            message: message.error.parameter,
            code: 204
        });
    }
});

router.route('/register').post(function (req, res) {
    try {
        userController.register(req.body, function (err, user) {
            if (!err) {
                res.send(user);
            } else {
                res.send(err);
            }
        });
    } catch (err) {
        res.send({
            err: err,
            message: message.error.parameter,
            code: 204
        });
    }
});


router.route('/user').get(function (req, res) {
    try {
        if (req.header('Authorization')) {
            var session = token.ensureAuthenticated(req.header('Authorization'));
            if (session.success) {
                var user_id = session.user
                userController.getUser(user_id, function (err, user) {
                    if (!err) {
                        res.send(user);
                    } else {
                        res.send(err);
                    }
                });
            } else {
                res.status(401).send({
                    err: message.error.unAuthorize,
                    message: message.error.unAuthorize,
                    code: 401,
                    success: false
                });
            }
        } else {
            res.status(401).send({
                err: message.error.unAuthorize,
                message: message.error.unAuthorize,
                code: 401,
                success: false
            });
        }
    } catch (err) {
        res.send({
            err: err,
            message: message.error.parameter,
            code: 204
        });
    }
});

module.exports = router;