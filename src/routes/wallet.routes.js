import { Router } from "express"
import authValidation from "../middlewares/authValidation.js"
import { findBalance, createMovimentation} from "../controllers/wallet.controller.js"
import { validateMovimentation } from "../middlewares/validateMovimentation.js"

const router = Router()

router.use(authValidation)

router.get("/wallet", findBalance)

router.use(validateMovimentation)

router.post("/wallet", createMovimentation)
//router.delete("/wallet/:id", deleteMovimentation)
//router.put("/wallet/:id", updateMovimentation)

export default router