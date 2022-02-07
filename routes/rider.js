const router = require('express').Router();
let {riders} = require('../helper/consts');
let {generateId} = require('../helper/consts');
const createError = require('http-errors');

// get new driver page form
router.get('/', (req, res) => {
  res.render('rider');
});

// add new driver
router.post('/list', (req, res, next) => {

  try {
    const { name, lat, lng, available} = req.body;

    if (!name || !available || !lat || !lng) throw createError(400, 'Details wrong');

    if (!['true', 'false'].includes(available)) throw createError(400, 'Details wrong');

    riders.push({
      name,
      lat: Number(lat),
      lng: Number(lng),
      available: available == 'true' ? true : false,
      id: generateId(5)
    });
    res.redirect('/rider/list')
  } catch (error) {
    next (error);
  }
})

// get list of all drivers
router.get('/list', (req, res) => {
  res.send(riders);
})


module.exports = router;
