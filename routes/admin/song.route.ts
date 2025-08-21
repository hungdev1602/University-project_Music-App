import { Router } from "express"
import * as controller from "../../controller/admin/song.controller"

const router: Router = Router()

router.get("/songs", controller.index)

export const songRoute = router