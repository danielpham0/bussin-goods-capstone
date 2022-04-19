import express from 'express';
import authRouter from './user-v1/auth.js'

var router = express.Router();

router.use('/auth', authRouter)

router.get('/getUser', async function(req,res,next) {
    try {
        let user = await req.db.User.findByID(req.body.userID)
        res.json(user)
    }catch(error) {
        res.status(500)
        res.json({status: 'error', error: error.toString()})
    }
})

router.post('/updateUser', async function(req,res,next) {
    try {
        let user = await req.db.User.findById(req.userID);
        if (!user || user.account_type != 'Admin') {
            res.status(401)
            res.json({status: 'error', 
                error: 'User does not have permission to edit another User.'})
            return
        }
        await req.db.User.findByIdAndUpdate(
            req.body.userID,
            req.body.updatedUser
          )
        res.json({status: 'success'})
    }catch(error) {
        res.status(500)
        res.json({status: "error", error: error.toString()})
    }
})

router.delete('/deleteUser', async function(req,res,next) {
    try {
        let user = await req.db.User.findById(req.userID);
        if (!user || user.account_type != 'Admin') {
            res.status(401)
            res.json({status: 'error', 
                error: 'User must be approved as an Admin.'})
            return
        }
        await req.db.CardSet.findByIdAndDelete(req.body.userID)
        res.json({status: 'success'})
    } catch(error) {
        res.status(500)
        res.json({status: 'error', error: error})
    }
})

export default router;