import { Router } from 'express';
import movieCtrl from "./movie.controller"
import { Validate, ValidateMovieIdField, ValidateQueries } from "../../utils/validators"

const router = Router();


export default (app) => {
    app.use('/movie', router)

    router.route('/').get(movieCtrl.getAllMovies)
    router.route('/:movieId').get(ValidateMovieIdField, Validate, movieCtrl.getMovieById)
    router.route('/:movieId/characters').get(ValidateQueries, Validate, movieCtrl.getMovieCharacters)
}

