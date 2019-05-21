router.route('/client').post(function (req, res) {
    if (req.header('Authorization')) {
        var session = token.ensureAuthenticated(req.header('Authorization'));
        if (session.success) {
            try {
                clientController.addClient(req.body, function (err, client) {
                    if (!err) {
                        res.send(client);
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
});


router.route('/client/:client_id').get(function (req, res) {
        if (req.header('Authorization')) {
            var session = token.ensureAuthenticated(req.header('Authorization'));
            if (session.success) {
                try {
                    var client_id = req.params.client_id;
                    clientController.getClientById(client_id, function (err, client) {
                        if (!err) {
                            res.send(client);
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
    })
    .put(function (req, res) {
        if (req.header('Authorization')) {
            var session = token.ensureAuthenticated(req.header('Authorization'));
            if (session.success) {
                try {
                    var client = {
                        client_id: req.params.client_id,
                        client: req.body
                    }
                    clientController.updateClient(client, function (err, client) {
                        if (!err) {
                            res.send(client);
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
    }).delete(function (req, res) {
        if (req.header('Authorization')) {
            var session = token.ensureAuthenticated(req.header('Authorization'));
            if (session.success) {
                try {
                    var client_id = req.params.client_id;
                    clientController.deleteClient(client_id, function (err, client) {
                        if (!err) {
                            res.send(client);
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
    });

router.route('/getclient/:owner_id/:organisation').get(function (req, res) {
    if (req.header('Authorization')) {
        var session = token.ensureAuthenticated(req.header('Authorization'));
        if (session.success) {
            try {
                var client = {
                    owner_id: req.params.owner_id,
                    organisation_owner: req.params.organisation
                }
                console.log(client);
                clientController.getAllClients(client, function (err, client) {
                    if (!err) {
                        res.send(client);
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
});

module.exports = router;