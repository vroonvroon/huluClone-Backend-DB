const express = require('express');
const router = express.Router();
const getSeries = require('../series/series-controller');


router.get('/series/:seriesName', getSeries);

module.exports = router;