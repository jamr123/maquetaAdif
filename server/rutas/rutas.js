'use strict'

const express = require('express');
const api = express.Router();
const dps=require('../controladores/dps');
///////rutas--login//////

api.get('/dps', dps.dpslog);

module.exports = api

