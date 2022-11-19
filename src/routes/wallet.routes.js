import { Router } from "express"

const router = Router()

router.use(authValidation)

router.get("/wallet", findBalance)
router.post("/wallet", createMovimentation)
router.delete("/wallet/:id", deleteMovimentation)
router.put("/wallet/:id", updateMovimentation)

export default router