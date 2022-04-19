import express from 'express';
import authRouter from './user-v1/auth.js'

var router = express.Router();

router.use('/auth', authRouter)

router.post('/createUser', async function(req,res,next) {
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

        let newUser = new req.db.Product({
            store: req.storeID,
            name: req.body.name,
            tagline: req.body.tagline,
            cost: req.body.cost,
            type: req.body.type,
            pictures: [req.body.pictures],
            options: [[]],
            ships_to: [req.body.ships_to],
            pickup_from: req.body.pickup_from,
            general_description: req.body.desc,
            additonalInfo: [req.body.additonalInfo]
        })
        await newProduct.save()
        res.json({status: "success", newProduct: newProduct})
    }catch(err) {
        res.status(500)
        res.json({status: 'error', error: err.toString()})
    }
})

export default router;