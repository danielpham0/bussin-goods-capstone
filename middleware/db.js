import mongoose from 'mongoose';
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
    account_type: String, // initially set to Standard
    email: String,
    address: String, // not set initially
    profile_picture: String // may be an id to GridFs, not set initially
  })
  db.User = mongoose.model('User', userSchema)

  const storeSchema = new mongoose.Schema({
    name: String,
    admins: [{
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User'
    }],
    products: [{
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Product'
    }],
    stripe: {
      accountID: String,
      enabled: Boolean
    },
    type: String, // Starting here could be a part of a store profile
    cohort: String,
    about: String,
    tagLine: String,
    socialLinks: [{
      socialMedia: String,
      link: String
    }],
    private: Boolean
  })
  db.Store = mongoose.model('Store', storeSchema)

  const productSchema = new mongoose.Schema({
    store: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Store'
    },
    name: String,
    tagline: String,
    cost: Number,
    type: String,
    pictures: [String], // may be an id to GridFs
    options: [{
      title: String,
      choices: [String],
    }],
    shipsTo: [String],
    pickupFrom: [String],
    general_description: String,
    additionalInformation: [{
      title: String,
      description: String
    }]
  })
  db.Product = mongoose.model('Product', productSchema)

  const orderSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User'
    },
    store: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Store'
    },
    stripePaymentID: String,
    paid: Boolean,
    products: [{
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Product'
    }],
    total: Number,
    address: String,
    order_date: Date,
    order_status: String // WILL REQUIRE AN ENUM LATER
  })
  db.Order = mongoose.model('Order', orderSchema)

  const reviewSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Product'
    },
    rating: Number,
    comment: String,
    datePosted: Date
  })
  db.Review = mongoose.model('Review', reviewSchema)

  console.log("created db schemas and models")
}

export default db;