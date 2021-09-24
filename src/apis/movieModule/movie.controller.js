import asyncHandler from "../../utils/handlers/asyncHandler/async";
import { successResponse } from "../../utils/handlers/responseHandler/response";
import movieService from "../../services/movie.service";

const movieCtrl  =  {
    getAllMovies:  asyncHandler(async( req, res ) => {
       let movieList = await movieService.allMoviesWithComments()
        return successResponse(res, movieList)
    }),

    getMovieById: asyncHandler(async( req, res ) => {
        const {movieId} = req.params
        const movie = await movieService.singleMovie(movieId)
        return successResponse(res, movie)
    }),

    getMovieCharacters: asyncHandler(async( req, res ) => {
        const {sortBy, sortType, gender} = req.query
        const {movieId} = req.params
        const sort = {sortBy, sortType};
        const filters = {gender}
        const movieList = await movieService.movieCharacters(movieId, sort, filters)
        return successResponse(res, movieList)
    })
}

export default movieCtrl