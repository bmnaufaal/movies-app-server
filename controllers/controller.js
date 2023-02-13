"use strict"
const { Movie } = require('../models/index')

class Controller {
    static async findAllGenres(req, res) {
        res.status(200).json({
            message: "Success get data"
        });
    }

    static async findAllMovies(req, res) {
        try {
            const movies = await Movie.findAll({
                include: [ Genre ]
            });
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}

module.exports = Controller;