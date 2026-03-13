import { Router } from "express";
import { getTrendingTV,getTvTrailers,getTvDetials,getSimilarTv,getTvByCategory } from "../controller/tv.controller.js";

const router = Router()

router.get("/trending",getTrendingTV)
router.get("/:id/trailers",getTvTrailers)
router.get("/:id/details",getTvDetials)
router.get("/:id/similar",getSimilarTv)
router.get("/:category",getTvByCategory)

export default router