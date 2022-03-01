import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);
const webHookSecret = process.env.STRIPE_WH;

router.post('/createPayment', async function(req, res, next) {
    const user = 'test' // will have to pull from the request (authenticated)
    const store = req.body.storeId
    const amount = req.body.amount

    // given the store id, retrieve their stripe account id
    const storeStripe = 'acct_1KYJMBEPtLNC0ruw'

    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: amount,
        currency: 'usd',
        application_fee_amount: 0,
      }, {
        stripeAccount: storeStripe,
    });
    console.log(paymentIntent)
    res.json({client_secret: paymentIntent.client_secret});
});

router.post('/stripeWebhook', (req,res) => {
  let event = req.body
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const connectedAccountId = event.account;
    handleSuccessfulPaymentIntent(connectedAccountId, paymentIntent);
  }
  res.json({received: true});
});
  
const handleSuccessfulPaymentIntent = (connectedAccountId, paymentIntent) => {
    // Fulfill the purchase.
    // - update the store
    // - update the user order history if there is a user id
    // - EMAIL CONFIRMATION ON BOTH ENDS
    console.log('Connected account ID: ' + connectedAccountId);
    console.log(JSON.stringify(paymentIntent));
}

export default router;