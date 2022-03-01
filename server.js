import express from 'express';
import bodyParser from 'body-parser'
import indexRouter from './routes/index.js';
import paymentV1Router from './routes/payment-v1.js'
import storeV1Router from './routes/store-v1.js'
import cors from 'cors'
import ngrok from 'ngrok'

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: Add cors options so that it's just for our front-end
app.use(cors())

const url = await ngrok.connect({
  addr: 3001,
  authtoken: process.env.NGROK_TOKEN
});
console.log(url + '/api/v1/payment/stripeWebhook')

app.use('/', indexRouter);
app.use(`/api/v1/payment`, paymentV1Router);
app.use(`/api/v1/store`, storeV1Router);

const port = 3001;

app.listen(port, () => `Server running on port ${port}`);