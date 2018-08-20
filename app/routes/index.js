const express = require('express');
const router = express.Router();

const config = rootRequire('./config/');
const logger = rootRequire('./config/logger');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Basic app'
  });
});

// /* Login page */
// router.get('/login', (req, res, next) => {
//   res.render('login');
// });
//
// /* Authentication user */
// router.post('/login', (req, res, next) => {
//   let data = req.body;
//   if (data.email === 'admin@admin.com' && data.password === 'admin') {
//     req.session.auth = true;
//     res.redirect('/home');
//   } else
//     res.render('login', {
//       result: 'Datos incorrectos.'
//     });
// });
//
// /* Logout auth. */
// router.get('/logout', (req, res, next) => {
//   req.session.destroy();
//   res.redirect('/');
// });
//
// /* GET home page. */
// router.get('/home', (req, res, next) => {
//   res.render('home');
// });

module.exports = router;
