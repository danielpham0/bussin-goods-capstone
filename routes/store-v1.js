import express from 'express';
import stripeRouter from './store-v1/stripe.js'

var router = express.Router();

router.use('/stripe', stripeRouter)

// create store -- authorization required for user type, current user is the first admin
// use case: users that have the account type "Store-Owner" can set up their store with initial info
// req.body --> name, type, cohort, about, tagline, socials, private

// get store
// use case: all types of users can view the store, with varying levels of access

// update store -- authorization required is user type and admin of the store
// use case: changing their profile/info, adding another user

// delete store -- authorization required is user type and admin of the store
// use case: if they no longer want the store to be up they can delete it

export default router;