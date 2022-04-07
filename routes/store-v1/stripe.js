import express from 'express';
import 'dotenv/config'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);

// TODO: Error Handling - Store already has id
router.get('/createAccount', async function(req, res, next) {
    // CHECK IF THIS USER IS AUTHORIZED
    const user = req.userID

    const store = await req.db.Store.findById(req.query.storeID)
    const account = await stripe.accounts.create({type: 'standard'});
    
    store.stripe.accountID = account.id
    await store.save()

    res.json({status: 'success'})
});

// TODO: Error Handling - store does or does not have account id
router.get('/getOnboardingLink', async function(req,res,next) {
    // CHECK IS THIS USER IS AUTHORIZED
    let user = req.userID

    let store = await req.db.Store.findById(req.query.storeID)
    let accountID = store.stripe.accountID

    const accountLink = await stripe.accountLinks.create({
        account: accountID,
        refresh_url: 'http://localhost:3000/store/profile/reauth',
        return_url: 'http://localhost:3000/store/profile',
        type: 'account_onboarding',
    });

    // sends an object with {created: ..., expires_at:..., url:...}
    res.json(accountLink)
})

router.get('/authenticateAccount', async function(req,res,next) {
    // CHECK IF THIS USER IS AUTHORIZED
    let user = req.userID

    let store = await req.db.Store.findById(req.query.storeID)
    let accountID = store.stripe.accountID

    let account = await stripe.accounts.retrieve(accountID)
    if (!account.charges_enabled) {
        res.status(500)
        res.json({status: 'error', message: 'User has not completed Stripe account.'})
        return
    }

    store.stripe.enabled = true
    await store.save()

    res.json({status: 'success'})
})

export default router;