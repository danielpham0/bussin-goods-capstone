import express from 'express';
import 'dotenv/config'
import Stripe from 'stripe'

var router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SK);

// Creates an order under a specific store, taking in storeID,
//    order information, and an array of product id's
router.post('/createStoreOrder', async function(req, res, next) {
  // user may not be logged in
  const user = req.userID
  try {
    let store = await req.db.Store.findById(req.body.storeID)
    const storeStripe = store.stripe.accountID
    req.body.products.forEach(product => {
      if(!store.products.contains(product)){
        res.status(400)
        res.json({status: 'error', 
          error: 'Each order must only contain products from a single store.'})
        return
      }
    });

    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: req.body.amount,
        currency: 'usd',
        application_fee_amount: 0,
      }, {
        stripeAccount: storeStripe,
    });

    // Store the order and add a payment intent Id
    const newOrder = new req.db.Order({
      customer: user,
      customer_info: req.body.customer_info,
      store: req.body.storeID,
      stripePaymentID: paymentIntent.id,
      paid: false,
      products: req.body.products,
      total: req.body.amount,
      order_date: new Date.now(),
      delivery_option: req.body.delivery_option,
      order_status: "Pending Payment"
    })
    await newOrder.save()

    res.json({client_secret: paymentIntent.client_secret});
  }catch(error) {
      res.status(500)
      res.json({status: 'error', error: error.toString()})
  }
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
  
const handleSuccessfulPaymentIntent = async (connectedAccountId, paymentIntent) => {
  let order = req.db.Order.find({stripePaymentID: paymentIntent.id})
  order.paid = true
  order.order_status = "Pending Seller Confirmation"
  await order.save()
  // Fulfill the purchase.
  // - EMAIL CONFIRMATION FOR BOTH CUSTOMER AND STORE
  console.log('Connected account ID: ' + connectedAccountId);
  console.log(JSON.stringify(paymentIntent));
}

router.get('/getUserOrders', async function(req,res,next) {
  if (!req.userID) {
    res.status(401)
    res.json({status: 'error', error: 'User must be logged in.'})
    return
  }
  try {
    let orders = await req.db.Order.find({customer: req.userID})
    res.json(orders)
  }catch(error) {
    res.status(500)
    res.json({status: 'error', error: error.toString()})
  }
})

router.get('/getOrder', async function(req,res,next) {
  try {
    let order = await req.db.Order.findById(req.body.orderID)
    let store = await req.db.Store.findById(order.store)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin || order.customer != req.userID) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this order.'})
      return
    }
    res.json(order)
  }catch(error) {
    res.status(500)
    res.json({status: 'error', error: error.toString()})
  }
})

router.get('/getUserOrders', async function(req,res,next) {
  if (!req.userID) {
    res.status(401)
    res.json({status: 'error', error: 'User must be logged in.'})
    return
  }
  try {
    let orders = await req.db.Order.find({customer: req.userID})
    res.json(orders)
  }catch(error) {
    res.status(500)
    res.json({status: 'error', error: error.toString()})
  }
})

router.post('/updateOrder', async function(req,res,next) {
  try {
    let order = await req.db.Order.findById(req.body.orderID)
    let store = await req.db.Store.findById(order.store)
    let userIsAdmin = store.admins.includes(req.userID)
    if (!userIsAdmin) {
      res.status(401)
      res.json({status: 'error', error: 'User does not have access to this order.'})
      return
    }
    await req.db.Order.findByIdAndUpdate(
      req.body.orderID,
      req.body.updatedOrder
    )
    res.json({status: 'success'})
  }catch(error) {
    res.status(500)
    res.json({status: "error", error: error.toString()})
  }
})

export default router;