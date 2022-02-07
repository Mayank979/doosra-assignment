const router = require('express').Router();

let { trips, users, riders, generateId, threshold_distance } = require('../helper/consts')
const createError = require('http-errors');

router.get('/', (req, res) => {
  res.render('trips', { trips });
});

router.post('/start/:user_id', (req, res, next) => {
  try {
    const { user_id } = req.params;

    const user = users.filter(u => u.id == user_id)[0];

    if (!user) throw createError(400, 'No user found');

    const maxDistance = Math.pow(threshold_distance, 2);

    let trip = {};

    riders.forEach(r => {
      if (r.available && !Object.keys(trip).length) {
        const latDist = Math.pow(r.lat - user.lat, 2)
        const lngDist = Math.pow(r.lng - user.lng, 2)
        console.log({ latDist, lngDist, maxDistance, r, user });
        if ((latDist + lngDist) <= maxDistance) {
          trip = {
            rider_id: r.id,
            user_id: user.id,
            id: generateId(5),
            status: 'started'
          };
          r.available = false;
        }
      }
    });

    if (!Object.keys(trip).length) throw createError(400, 'No riders found');

    trips.push(trip);
    user.inRide = true;

    res.redirect('/trips/');

  } catch (error) {
    next (error);
  }
})

router.post('/end/:trip_id', (req, res, next) => {
  try {
    const { trip_id } = req.params;

    const trip = trips.filter(t => t.id == trip_id)[0];

    if (!trip) throw createError(400, 'No such trip found');

    riders.forEach(r => {
      if (r.id == trip.rider_id) r.available = true;
    })

    users.forEach(u => {
      if (u.id == trip.user_id) u.inRide = false;
    })

    trip.status = 'completed';

    res.redirect('/trips/')

  } catch (error) {
    next (error);
  }
})

module.exports = router;
