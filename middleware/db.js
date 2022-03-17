import mongoose from 'mongoose';
import 'dotenv/config'

// Connect to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("connected to the database!")

  const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    first_name: String,
    last_name: String,
    accountType: String, // initially set to Standard
    email: String,
    address: String, // not set initially
    profile_picture: String // may be an id to GridFs, not set initially
  })
  db.User = mongoose.model('User', userSchema)

  const productSchema = new mongoose.Schema({
    storeId: String,
    name: String,
    tagline: String,
    cost: Number,
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

  const reviewSchema = new mongoose.Schema({
    userId: String, // user's cognito id
    productId: String, // replace with product id
    rating: Number,
    comment: String,
    datePosted: Date
  })

  db.Review = mongoose.model('Review', reviewSchema)

  const storeSchema = new mongoose.Schema({
    name: String,
    admins: [String], // array of user's cognito ids
    products: [String], // will become Product ID Array
    stripe: {
      accountID: String,
      enabled: Boolean
    },
    type: String, // Starting here could be a part of a store profile
    cohort: String,
    about: String,
    tagLine: String,
    socialLinks: {
      socialMedia: String,
      link: String
    }
  })

  db.Store = mongoose.model('Store', storeSchema)

  const orderSchema = new mongoose.Schema({
    customerID: String, // user cognito id
    storeID: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Store'
    },
    stripePaymentID: String,
    paid: Boolean,
    products: [String], // will become Product ID Array
    total: Number
  })

  db.Order = mongoose.model('Order', orderSchema)

  console.log("created db schemas and models")
}

export default db;