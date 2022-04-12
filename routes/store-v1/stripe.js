import express from 'express';
import 'dotenv/config'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);

router.get('/createAccount', async function(req, res, next) {
    const store = await req.db.Store.findById(req.body.storeID)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this store.'})
      return
    }
    if (!store.stripe.accountID) {
        res.status(400)
        res.json({status: 'error', error: 'Store already has an accountID, please continue with an onboarding link.'})
        return
    }
    const account = await stripe.accounts.create({type: 'standard'});
    
    store.stripe.accountID = account.id
    await store.save()

    res.json({status: 'success'})
});

router.get('/getOnboardingLink', async function(req,res,next) {
    const store = await req.db.Store.findById(req.body.storeID)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this store.'})
      return
    }
    let accountID = store.stripe.accountID
    if (!accountID) {
        res.status(400)
        res.json({status: 'error', error: 'Cannot get onboarding link, please generate a stripe account ID first.'})
        return
    }
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
    const store = await req.db.Store.findById(req.body.storeID)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this store.'})
      return
    }
    let accountID = store.stripe.accountID

    let account = await stripe.accounts.retrieve(accountID)
    if (!account.charges_enabled) {
        res.status(500)
        res.json({status: 'error', message: 'Store has not completed Stripe account.'})
        return
    }

    store.stripe.enabled = true
    await store.save()

    res.json({status: 'success'})
})

export default router;