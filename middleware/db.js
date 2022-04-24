import mongoose from 'mongoose';
import * as constants from '../constants/constants.js'
import 'dotenv/config'

// Connect to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("connected to the database!")

  const userSchema = new mongoose.Schema({
    _id: String, // equivalent to the cognito ID
    username: String,
    first_name: String,
    last_name: String,
    account_type: {
      type: String,
      enum: constants.ACCOUNT_TYPES}, // initially set to Standard
    email: String,
    address: String,
    profile_picture_url: String // AWS S3 URL recieved from front-end
  })
  db.User = mongoose.model('User', userSchema)

  const storeSchema = new mongoose.Schema({
    name: String,
    admins: [{
      type: String,
      ref: 'User'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    stripe: {
      accountID: String,
      enabled: Boolean
    },
    ships_to: [{
      type: String,
      enum: constants.COUNTRIES}],
    pickup_from: [String],
    type: {
      type: String,
      enum: constants.STORE_TYPES}, // Starting here could be a part of a store profile
    cohort: String,
    about: String,
    tagline: String,
    social_links: [{
      social_media: constants.SOCIAL_TYPES,
      link: String
    }],
    email: String,
    private: Boolean,
    banner_url: String // AWS S3 URL recieved from front-end
  })
  db.Store = mongoose.model('Store', storeSchema)

  const productSchema = new mongoose.Schema({
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    },
    name: String,
    tagline: String,
    cost: Number,
    type: {
      type: String,
      enum: constants.PRODUCT_TYPES},
    pictures: [String], // URL's for image 
    options: [{
      title: String,
      choices: [String],
    }],
    general_description: String,
    additional_information: [{
      title: String,
      description: String
    }]
  })
  db.Product = mongoose.model('Product', productSchema)

  const orderSchema = new mongoose.Schema({
    customer: {
      type: String,
      ref: 'User'
    },
    customer_info: {
      first_name: String,
      last_name: String,
      address: {
        street_address: String,
        street_address_2: String,
        city: String,
        postal_code: String,
        state: String,
        country: String
      },
      email: String,
      phone_number: String
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    },
    stripePaymentID: String,
    paid: Boolean,
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }],
    total: Number,
    order_date: Date,
    delivery_option: {
      type: String,
      enum: constants.DELIVERY_OPTIONS},
    pickup_from: String,
    order_status: {
      type: String,
      enum: constants.ORDER_STATUS} // WILL REQUIRE AN ENUM LATER
  })
  db.Order = mongoose.model('Order', orderSchema)

  const reviewSchema = new mongoose.Schema({
    user: {
      type: String,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    rating: Number,
    comment: String,
    date_posted: Date
  })
  db.Review = mongoose.model('Review', reviewSchema)

  console.log("created db schemas and models")
}

export default db;