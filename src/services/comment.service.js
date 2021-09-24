import movieService from "./movie.service";
import config from "../utils/config";
const models = require('../../database/models');

const url = config.api.external

const commentService = {
    createComment: async (payload) => {
        const movieDetail = await movieService.singleMovie(payload.movieId)
        payload.movieTitle = movieDetail.title
        return models.Comment.create(payload)
    },

    allComments: async (query) => {
       return  await models.Comment.findAll( {where: query})
    }
}

export default commentService