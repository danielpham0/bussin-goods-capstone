import express from 'express';
import 'dotenv/config'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);

router.get('/getOnboardingLink', async function(req,res,next) {
    const store = await req.db.Store.findById(req.query.storeID)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this store.'})
      return
    }

    if (!store.stripe || !store.stripe.accountID) {
        const account = await stripe.accounts.create({type: 'standard'});
        store.stripe = {accountID: account.id}
        await store.save()
    }
    
    let accountID = store.stripe.accountID

    const accountLink = await stripe.accountLinks.create({
        account: accountID,
        refresh_url: `http://localhost:3000/Dashboard/${req.query.storeID}`,
        return_url: `http://localhost:3000/Dashboard/${req.query.storeID}`,
        type: 'account_onboarding',
    });

    // sends an object with {created: ..., expires_at:..., url:...}
    res.json(accountLink)
})

router.get('/authenticateAccount', async function(req,res,next) {
    const store = await req.db.Store.findById(req.query.storeID)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this store.'})
      return
    }
    if (!store.stripe || !store.stripe.accountID) {
        res.status(400)
        res.json({status: 'error', error: 'Store has not gone through onboarding link yet.'})
        return
    }

    let accountID = store.stripe.accountID

    let account = await stripe.accounts.retrieve(accountID)
    if (!account.charges_enabled) {
        res.status(500)
        res.json({status: 'error', error: 'Store has not completed Stripe account.'})
        return
    }

    store.stripe.enabled = true
    await store.save()

    res.json({status: 'success'})
})

export default router;