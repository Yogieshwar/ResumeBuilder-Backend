import express from "express"
import { createResume,getMyResumes ,getResumeById,updateResume,deleteResume} from "../controllers/ResumeController.js"
import { authMiddleware} from "../middleware/authmiddleware.js"



const router=express.Router()
router.use(authMiddleware)

router.post('/',createResume)
router.get('/',getMyResumes)
router.get('/:id',getResumeById)
router.put('/:id',updateResume)
router.delete('/:id',deleteResume)
export default router;

