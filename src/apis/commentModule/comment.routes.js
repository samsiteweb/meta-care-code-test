import { Router } from 'express';
import commentCtrl from "./comment.controller"
import { ValidateComments, Validate, ValidateMovieIdField } from "../../utils/validators"
const router = Router();


export default (app) => {
    app.use('/movie', router)

    router.route('/:movieId/comment')
        .get(ValidateMovieIdField, Validate, commentCtrl.getMovieComments)
        .post(ValidateComments, Validate, commentCtrl.createComment)
}

