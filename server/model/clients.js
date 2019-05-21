var clients = function () {

    var clientModel = mongoose.Schema({
        client_name: {
            type: String,
            required: true
        },
        client_email: {
            type: String,
            required: true
        },
        client_mobile: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        organisation: {
            type: String,
            required: true
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        linkedIn_profile: {
            type: String
        },
        client_designation: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        website: {
            type: String
        },
        owner: {
            type: String,
            required: true
        },
        organisation_owner: {
            type: String,
            required: true
        }
    });

    _clientModel = mongoose.model('Clients', clientModel);

    var result_obtained = "",
        error_obtained = "";


    _addClient = function (client, callback) {
        var newClient = new _clientModel(client);
        newClient.save(function (err, clientData) {
            if (!err) {
                result_obtained = {
                    data: clientData,
                    message: message.success.data,
                    code: 201,
                    success: true
                }
                callback(null, result_obtained);
            } else {
                error_obtained = {
                    code: 204,
                    error: err,
                    message: message.error.data,
                    success: false
                }
                callback(error_obtained, null);
            }
        })
    };

    _updateClient = function (client, callback) {
        _clientModel.update({
            "_id": client.client_id
        }, {
            $set: client.client
        }, function (err, clientData) {
            if (!err) {
                result_obtained = {
                    data: clientData,
                    message: message.success.data,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained);
            } else {
                error_obtained = {
                    data: err,
                    message: message.error.data,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    };

    _deleteClient = function (client_id, callback) {
        if (client_id !== undefined) {
            _clientModel.remove({
                "_id": client_id
            }, function (err, data) {
                if (!err) {
                    result_obtained = {
                        data: data,
                        message: message.success.remove,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        data: err,
                        message: message.error.remove,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: "",
                message: message.error.validation,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };

    /**
     * Get Authenticated User
     * @param  req
     * @param  res
     * @return json
     */
    _getClientById = function (client_id, callback) {
        _clientModel.findById(client_id, function (err, user) {
            if (!err) {
                result_obtained = {
                    client: user,
                    message: message.success.data,
                    code: 200,
                    success:true
                };
                callback(null, result_obtained);
            } else {
                error_obtained = {
                    code: 204,
                    error: err,
                    message: message.error.data,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    };

    _getAllClients = function (client, callback) {
        if (client.owner_id !== undefined || client.organisation_owner !== undefined) {
            _clientModel.find({
                $or: [{
                    "owner": client.owner_id
                }, {
                    "organisation_owner": client.organisation_owner
                }]
            }, function (err, clientData) {
                if (!err) {
                    result_obtained = {
                        client: clientData,
                        message: message.success.data,
                        code: 200,
                        success:true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        code: 204,
                        error: err,
                        message: message.error.data,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: "",
                message: message.error.validation,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };

    return {
        getAllClients: _getAllClients,
        addClient: _addClient,
        getClientById: _getClientById,
        deleteClient: _deleteClient,
        updateClient: _updateClient,
        clientModel: _clientModel
    }
}();
module.exports = clients;