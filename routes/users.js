import express from 'express';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = [
    {id: 1, firstName: 'Daniel', lastName: 'Pham'},
    {id: 2, firstName: 'Jonathan', lastName: 'Thomas'},
    {id: 3, firstName: 'Eric', lastName: 'Le'},
    {id: 4, firstName: 'Tommy', lastName: 'Lam'}
  ];
  res.json(users);
});

export default router;
