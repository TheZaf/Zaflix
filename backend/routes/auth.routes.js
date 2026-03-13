import { Router } from "express";
import { logIn, signUp ,logOut, authCheck} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/middleware.js";

const router = Router()

router.post('/signup',signUp)
router.post('/login',logIn)
router.post('/logout',logOut)

router.get('/checkauth',protectedRoute,authCheck)

export default router