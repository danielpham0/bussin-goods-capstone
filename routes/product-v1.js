import express from 'express';
import stripeRouter from './store-v1/stripe.js'

var router = express.Router();

router.use('/stripe', stripeRouter)

router.post('/createProduct', async function(req,res,next) {
    try {
        let store = await req.db.Store.findById(req.body.storeID)
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            store.stripe = null
            if (store.private) {
                res.status(401)
                res.json({status: 'error', 
                    error: 'User does not have access to this store.'})
                return
            }
        }

        let newProduct = new req.db.Product({
            store: req.storeID,
            name: req.body.name,
            tagLine: req.body.tagLine,
            cost: req.body.cost,
            type: req.body.type,
            pictures: [req.body.pictures],
            options: [[]],
            shipsTo: req.body.shipsTo,
            pickupFrom: req.body.pickupFrom,
            generalDesc: req.body.desc,
            additonalInfo: req.body.additonalInfo
        })
        await newProduct.save()
        res.json({status: "success", newProduct: newProduct})
    }catch(err) {
        res.status(500)
        res.json({status: 'error', error: err.toString()})
    }
})

router.get('/getProduct', async function(req,res,next) {
    try {
        let product = await req.db.Product.findByID(req.body.productID)
        let store = product.store
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            store.stripe = null
            if (store.private) {
                res.status(401)
                res.json({status: 'error', 
                    error: 'User does not have access to this store or product.'})
                return
            }
        }
        res.json(product)
    }catch(error) {
        res.status(500)
        res.json({status: 'error', error: error.toString()})
    }
})

router.post('/updateProduct', async function(req,res,next) {
    try {
        let product = await req.db.Product.findById(req.body.productID)
        let store = product.store
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            res.status(401)
            res.json({status: 'error', 
                error: 'User is not an admin for this store.'})
            return
        }
        await req.db.Product.findByIdAndUpdate(
            req.body.productID,
            req.body.updatedProduct
          )
        res.json({status: 'success'})
    }catch(error) {
        res.status(500)
        res.json({status: "error", error: error.toString()})
    }
})

router.delete('/deleteProduct', async function(req,res,next) {
    try {
        let product = await req.db.Product.findById(req.body.productID)
        let store = product.store
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            res.status(401)
            res.json({status: 'error', 
                error: 'User is not an admin for this store.'})
            return
        }
        await req.db.CardSet.findByIdAndDelete(req.body.productID)
        res.json({status: 'success'})
    } catch(error) {
        res.status(500)
        res.json({status: 'error', error: error})
    }
})

export default router;