import { Router } from "express"
import * as controller from "../../controller/admin/song.controller"
import multer from "multer"
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware"

const router: Router = Router()

const upload = multer()

router.get("/", controller.index)

router.get("/create", controller.createGet)

router.post(
  "/create", 
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
)

export const songRoute = router