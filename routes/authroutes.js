import express from"express"
import { userregister,userlogin } from "../controllers/authController.js";

 const router=express.Router();

router.post('/register',userregister);
router.post('/login',userlogin);


export default router;