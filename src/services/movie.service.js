import axios from "axios";
import _orderBy from "lodash.orderby";
import config from "../utils/config";
import _map from "lodash.map"
import _filter from "lodash.filter"
import { cmTo_Ft_In } from "../utils/helpers"
const models = require('../../database/models');

const url = config.api.external

const getCharacterDetails = async(characters) => {
    const characterArray = characters.map(async ch => {
        const response =  await axios.get(`${ch}`);
        const { height } = response.data
        return {
            ... response.data,
            height: cmTo_Ft_In(height)
        }
    });
    return await Promise.all(characterArray);
}

const movieService = {

    singleMovie: async (id) => {
        const movie = await axios.get(`${url}/films/${id}`)
        const { title, opening_crawl, release_date, director, producer, episode_id }= movie.data
        return { title, opening_crawl, release_date, director, producer, episode_id }
    },

    allMoviesWithComments: async () => {
        let movies = await axios.get(`${url}/films`)
        const { results } = movies.data

        const movieTitles = _map(results, 'title')
        const comments = await models.Comment.findAll( {raw: true, where: {movieTitle: movieTitles } })

        const movieArray = results.map(  (movie) => {
            const { title,opening_crawl, release_date, director, producer, episode_id } = movie
            return {
                comment: {count: _filter(comments, (comment) => comment.movieTitle === title).length},
                title,opening_crawl,release_date,director,producer,episode_id
            }
        })
        return  _orderBy(movieArray,['release_date'], ['asc'])
    },

    movieCharacters: async (movieId, sort, filters) => {
        const {sortBy, sortType } = sort;
        const metadata = {}

        const movieList = await axios.get(`${url}/films/${movieId}`)

        const { characters } = movieList.data
        let characterWithDetails = await getCharacterDetails(characters)

        if (sortBy){
            metadata.sortBy = sortBy;
            metadata.sortType = sortType;
            characterWithDetails = _orderBy(characterWithDetails,[sortBy], [sortType])
        }

        if (filters) {
            characterWithDetails = _filter(characterWithDetails, {...filters})
            metadata.filters = {
                ...filters,
                matchCount: characterWithDetails.length
            }
        }

        return {
            metadata,
            characters: characterWithDetails
        }
    }
}
export default movieService