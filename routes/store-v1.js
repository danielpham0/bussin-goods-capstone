import express from 'express';
import stripeRouter from './store-v1/stripe.js'

var router = express.Router();

router.use('/stripe', stripeRouter)

export default router;