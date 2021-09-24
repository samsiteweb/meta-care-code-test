import { Router } from 'express';
import movieModule from '../../../apis/movieModule/movie.routes'
import commentModule from '../../../apis/commentModule/comment.routes'
/**
 *
 * Route loaders
 */
export default () => {
    const app = Router();
    movieModule(app)
    commentModule(app)
    return app;
};