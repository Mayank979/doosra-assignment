const router = require('express').Router();

let {threshold_distance} = require('../helper/consts');

// register a new driver
router.get('/', (req, res) => {
  res.render('distance', { threshold_distance });
});

router.post('/', (req, res) => {
  threshold_distance = req.body.distance;
  res.redirect('/admin')
})

module.exports = router;
