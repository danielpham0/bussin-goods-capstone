import express from 'express';
import mongoose from 'mongoose'
import stripeRouter from './store-v1/stripe.js'

var router = express.Router();

router.use('/stripe', stripeRouter)

router.post('/createStore', async function(req,res,next) {
    try {
        let user = await req.db.User.findById(req.userID);
        if (!user || user.account_type != 'Store Owner') {
            res.status(401)
            res.json({status: 'error', 
                error: 'User must be approved as a Store Owner.'})
            return
        }
        let newStore = new req.db.Store({
            name: req.body.name,
            admins: req.userID,
            products: [],
            ships_to: req.body.ships_to,
            pickup_from: req.body.pickup_from,
            type: req.body.type,
            cohort: req.body.cohort,
            about: req.body.about,
            social_links: req.body.social_links,
            tagline: req.body.tagline,
            private: req.body.private,
            email: req.body.email
        })
        await newStore.save()
        res.json({status: "success", newStore: newStore})
    }catch(err) {
        res.status(500)
        res.json({status: 'error', error: err.toString()})
    }
})

router.get('/getStore', async function(req,res,next) {
    try {
        let store = await req.db.Store.findById(req.query.storeID)
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            store.email = null
            if (store.private) {
                res.status(401)
                res.json({status: 'error', 
                    error: 'User does not have access to this store.'})
                return
            }
        }
        res.json(store)
    }catch(error) {
        res.status(500)
        res.json({status: 'error', error: error.toString()})
    }
})

router.get('/getAllPublicStores', async function(req, res, next) {
    try {
        // change private to false after a
        let store = await req.db.Store.find({private: true}).select('name cohort type') 
        res.json(store)
    } catch (error) {
        res.status(500)
        res.json({status: 'error', error: error.toString()})
    }
})

router.get('/getUserStores', async function(req,res,next) {
    try {
        let user = await req.db.User.findById(req.userID);
        if (!user || user.account_type != 'Store Owner') {
            res.status(401)
            res.json({status: 'error', 
                error: 'User must be approved as a Store Owner.'})
            return
        }
        let stores = await req.db.Store.find({admins: {$in: req.userID}})
        res.json(stores)
    }catch(error) {
        res.status(500)
        res.json({status: 'error', error: error.toString()})
    }
})

router.post('/updateStore', async function(req,res,next) {
    try {
        let store = await req.db.Store.findById(req.body.storeID)
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            res.status(401)
            res.json({status: 'error', 
                error: 'User is not an admin for this store.'})
            return
        }
        await req.db.Store.findByIdAndUpdate(
            req.body.storeID,
            req.body.updatedStore
          )
        res.json({status: 'success'})
    }catch(error) {
        res.status(500)
        res.json({status: "error", error: error.toString()})
    }
})

router.delete('/deleteStore', async function(req,res,next) {
    try {
        let store = await req.db.Store.findById(req.body.storeID)
        let userIsAdmin = store.admins.includes(req.userID)
        if (!userIsAdmin) {
            res.status(401)
            res.json({status: 'error', 
                error: 'User is not an admin for this store.'})
            return
        }
        await req.db.CardSet.findByIdAndDelete(req.body.storeID)
        res.json({status: 'success'})
    } catch(error) {
        res.status(500)
        res.json({status: 'error', error: error})
    }
})

export default router;