import express from 'express';
import authRouter from './user-v1/auth.js'

var router = express.Router();

router.use('/auth', authRouter)

export default router;