const router = require('express').Router();
let {users} = require('../helper/consts');
let {generateId} = require('../helper/consts');

// register a new driver
router.get('/', (req, res) => {
  res.render('user');
});

router.post('/list', (req, res) => {

  const { name, lat, lng } = req.body;
  users.push({
    name,
    lat: Number(lat),
    lng: Number(lng),
    id: generateId(5),
    inRide: false
  });

  res.redirect('/user/list')
})

router.get('/list', (req, res) => {
  res.render('user_lists', { users });
})


module.exports = router;
