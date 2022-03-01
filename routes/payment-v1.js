import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);

// TAKES: storeID, 
router.post('/createOrder', async function(req, res, next) {
  // Check if user is logged in
  const user = 'test' // pull from Req Auth

  const store = await req.db.Store.findById(req.body.storeID)
  const storeStripe = store.stripe.accountID

  const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: amount,
      currency: 'usd',
      application_fee_amount: 0,
    }, {
      stripeAccount: storeStripe,
  });

  // Store the order and add a payment intent Id
  const newOrder = new req.db.Order({
    customerID: user,
    storeID: req.body.storeID,
    stripePaymentID: paymentIntent.id,
    paid: false,
    products: req.body.products,
    total: req.body.amount
  })
  await newOrder.save()

  res.json({client_secret: paymentIntent.client_secret});
});

router.post('/stripeWebhook', (req,res) => {
  let event = req.body
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const connectedAccountId = event.account;
      handleSuccessfulPaymentIntent(connectedAccountId, paymentIntent);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.json({received: true});
});
  
const handleSuccessfulPaymentIntent = (connectedAccountId, paymentIntent) => {
  let order = req.db.Order.find({stripePaymentID: paymentIntent.id})
  order.paid = true
  await order.save()
  // Fulfill the purchase.
  // - EMAIL CONFIRMATION FOR BOTH CUSTOMER AND STORE
  console.log('Connected account ID: ' + connectedAccountId);
  console.log(JSON.stringify(paymentIntent));
}

export default router;