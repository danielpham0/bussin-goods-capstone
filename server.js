import express from 'express';
import cookieParser from 'cookie-parser';
import db from "./middleware/db.js";
import cors from 'cors'
import ngrok from 'ngrok'
import 'dotenv/config'

import authJwt from './middleware/authJwt.js'
import orderV1Router from './routes/order-v1.js'
import storeV1Router from './routes/store-v1.js'
import userV1Router from './routes/user-v1.js'
import productV1Router from './routes/product-v1.js'
import s3V1Router from './routes/s3-v1.js'

import path from 'path';
import { fileURLToPath } from 'url';

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: ['http://localhost:3000', 'https://bussin-goods.herokuapp.com/']}))

app.use(cookieParser());
app.use( function (req, res, next) {
  req.db = db;
  authJwt(req)
  next();
})

// Exposes the local server so that Stripe can reach Webhook
if (process.env.NODE_ENV !== 'production') {
  const url = await ngrok.connect({
    addr: 3001,
    authtoken: process.env.NGROK_TOKEN
  });
  // When testing payment processing, you must add this endpoint to Stripe
  console.log('Add Stripe Webhook Endpoint: ' + url + 
    '/api/v1/order/stripeWebhook')
}

// STRIPE DOCUMENTATION: https://stripe.com/docs/payments/handling-payment-events
app.use(`/api/v1/order`, orderV1Router);
app.use(`/api/v1/store`, storeV1Router);
app.use(`/api/v1/product`, productV1Router);
app.use(`/api/v1/user`, userV1Router);
app.use(`/api/v1/s3`, s3V1Router);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => `Server running on port ${port}`);