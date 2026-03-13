import { Router } from "express";
import { getMovieDetials, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from "../controller/movie.controller.js";

const router = Router()

router.get("/trending",getTrendingMovie)
router.get("/:id/trailers",getMovieTrailers)
router.get("/:id/details",getMovieDetials)
router.get("/:id/similar",getSimilarMovies)
router.get("/:category",getMoviesByCategory)


export default router;