const { movie: Movie } = require("../api/models");
const { NotFoundError } = require("../exceptions");

class MovieRepository {
  static create = async (payload) => {
    const movie = await Movie.create(payload);

    return movie;
  }

  static getAll = async () => {
    const movies = await Movie.findAll();

    return movies;
  }

  static getById = async (id) => {
    const movie = await Movie.findByPk(id);

    return movie;
  }

  static updateById = async (id, payload) => {
    const movie = await MovieRepository.getById(id);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    await Movie.update(payload, {
      where: {
        id
      }
    });
  }

  static deleteById = async (id) => {
    const movie = await MovieRepository.getById(id);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    await Movie.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = MovieRepository;