const Series = require('../models/series-model');


const getSeries = async (req, res) => { 
  try {
    const seriesName = req.params.seriesName;
    const seriesData = await Series.findOne({ name: seriesName });
    console.log(seriesData);
    res.status(200).json(seriesData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching series data' });
  }
};

module.exports = getSeries;