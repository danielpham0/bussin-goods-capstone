import express from 'express';
import stripeRouter from './store-v1/stripe.js'

var router = express.Router();

router.use('/stripe', stripeRouter)

router.post('/createProduct', async function(req,res,next) {
    try {
        let store = await req.db.Store.findById(req.body.storeID)
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            res.status(401)
            res.json({status: 'error', 
                error: 'User does not have access to this store.'})
            return
        }
        let newProduct = new req.db.Product({
            store: req.body.storeID,
            name: req.body.name,
            tagline: req.body.tagline,
            cost: req.body.cost,
            type: req.body.type,
            pictures: req.body.pictures,
            options: [[]],
            general_description: req.body.general_description,
            additional_information: req.body.additional_information
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
        let product = await req.db.Product.findById(req.query.productID).populate('store')
        let store = product.store
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            store.email = null
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

router.get('/getAllPublicProducts', async function(req, res, next) {
    try {
        // change private to false after a
        let store = await req.db.Store.find({private: false}).select('_id')
        let product = await req.db.Product.find({store: store}).populate('store').select('_id name store tagline type cost')
        res.json(product)
    } catch (error) {
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