import mongoose from 'mongoose';
import 'dotenv/config'

// Connect to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("connected to the database!")

  const storeSchema = new mongoose.Schema({
    name: String,
    admins: [String], // will become User ID Array
    products: [String], // will become Product ID Array
    stripe: {
      accountID: String,
      enabled: Boolean
    }
  })

  db.Store = mongoose.model('Store', storeSchema)

  const orderSchema = new mongoose.Schema({
    customerID: String, // will become User ID
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