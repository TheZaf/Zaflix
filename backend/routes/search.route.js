import { Router } from "express";

import { getSearchHistory, removeHistory, searchMovie, searchPerson, searchTv } from "../controller/search.controller.js";
import { protectedRoute } from "../middleware/middleware.js";

const router = Router()

router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history",protectedRoute,getSearchHistory)
router.delete("/history/:id",protectedRoute,removeHistory)

export default router;