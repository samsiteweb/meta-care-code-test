import asyncHandler from "../../utils/handlers/asyncHandler/async";
import { successResponse } from "../../utils/handlers/responseHandler/response";
import commentService from "../../services/comment.service";
const models = require('../../../database/models');

const commentCtrl  =  {
    createComment:  asyncHandler(async ( req, res ) => {
       let reqIp =  req.headers['x-forwarded-for'].split(',').shift()
        || req.socket.remoteAddress
        if (reqIp === "::1") {
            reqIp = "127:0:0:0"
        }
        const { comment } =  req.body
        const payload = {
            comment,
            movieId: req.params.movieId,
            userIp: reqIp,
            createdAt: new Date()
        }
        const newComment = await commentService.createComment(payload)
        return successResponse(res, newComment)
    }),

    getMovieComments: asyncHandler(async ( req, res ) => {
        const { movieId } =  req.params
        const query = { movieId: movieId }
        const comments = await commentService.allComments(query)
        return successResponse(res, comments)
    })
}


export default commentCtrl