class Controller {
    static async findAllGenres(req, res) {
        res.status(200).json({
            message: "Success get data"
        });
    }
}

module.exports = Controller;