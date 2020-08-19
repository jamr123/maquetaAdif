'use strict'

const express = require('express');
const api = express.Router();
const dps=require('../controladores/dps2');
///////rutas--login//////

api.get('/dps', dps.dpslog);

module.exports = api

