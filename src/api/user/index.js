const express = require('express');
const newUser = require('./new')
const loginuser = require('./login')
const middlewares = require('../../middlewares')


const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({
//     message: 'API - 👋🌎🌍🌏'
//   });
// });
router.use('/new', newUser)
router.use('/login', loginuser)

router.use(middlewares.userAuthenticate)


module.exports = router;
