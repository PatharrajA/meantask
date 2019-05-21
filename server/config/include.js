express = require('express');
router = express.Router();
mongoose = require('mongoose');
Schema = mongoose.Schema;
winston = require('winston');
passport = require('passport');
JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
bcrypt = require('bcrypt');
jwt = require('jwt-simple');
moment = require('moment');


config = require('./config');
message = require('./message');
token=require('./token');
require('./db');
require('../controller/controller');
