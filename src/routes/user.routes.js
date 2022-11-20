import { Router } from "express"
import { SignIn, SignUp} from "../controllers/user.controller.js"
import signInValidation  from "../middlewares/signInValidation.js"
import signUpValidation from "../middlewares/signUpValidation.js"

const router = Router()

router.post("/sign-in",  signInValidation, SignIn)
router.post("/sign-up",  signUpValidation, SignUp)

export default router