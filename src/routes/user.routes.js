import { Router } from "express"
import { SignIn, SignUp, LogOut} from "../controllers/user.controller.js"
import signInValidation  from "../middlewares/signInValidation.js"
import signUpValidation from "../middlewares/signUpValidation.js"
import authValidation from "../middlewares/authValidation.js"

const router = Router()

router.post("/sign-in", signInValidation, SignIn)
router.post("/sign-up", signUpValidation, SignUp)

router.use(authValidation)

router.post("/log-out", LogOut)

export default router