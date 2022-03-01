import express from 'express';
import 'dotenv/config'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);

// Creates an id on stripe's end for the user
router.get('/createAccount', async function(req, res, next) {
    const user = 'test' // will have to pull from the request (authenticated)
    const account = await stripe.accounts.create({type: 'standard'});
    // check if this is a verified business, add that they started to create
    // their account in the db
    console.log(account)
    res.json({status: 'success'})
});

// takes an id that has been generated for stripe --> produces a link for the user
// to create acc 
router.get('/getOnboardingLink', async function(req,res,next) {
    let user = 'test' // will have to pull from the request (authenticated)
    // check if they have an account id yet, check if they've been set up as well
    // get the user's account id if they have it
    let accountId = 'acct_1KYEBRPndt2a3xQD'
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: 'http://localhost:3000/store/profile/reauth',
        return_url: 'http://localhost:3000/store/profile',
        type: 'account_onboarding',
      });
    // sends an object with {created: ..., expires_at:..., url:...}
    console.log(accountLink)
    res.json(accountLink)
})

router.get('/authenticateAccount', async function(req,res,next) {
    let user = 'test' // will have to pull from the request (authenticated)
    // get user stripe acc
    let accountId = 'acct_1KYJMBEPtLNC0ruw'
    let account = await stripe.accounts.retrieve(accountId)
    if (!account.charges_enabled) {
        // have the front end ask for account links again
        res.status(500)
        res.json({status: 'error', message: 'User has not completed Stripe account.'})
        return
    }
    console.log(account)
    // store the authentication in our db
    res.json({status: 'success'})
})

export default router;