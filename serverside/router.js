import { Router } from "express";
import * as rh from './reqhandler.js'
import Auth from "./midleware/Auth.js";
const router =Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/getData').get(Auth,rh.getData)
router.route('/add').post(rh.addData)
router.route('/getbook').get(rh.getBook)
router.route('/updateone/:id').put(rh.updateOne)
router.route('/deleteone/:id').delete(rh.deleteOne)
router.route('/user/:id').get(rh.getUser)

export default router;
