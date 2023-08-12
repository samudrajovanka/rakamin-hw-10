const { NotFoundError } = require('../exceptions');
const MovieRepository = require('../repositories/MovieRepository');
const { randomNumberId } = require('../utils/common');

class MovieService {
  static getAll = async () => {
    const movies = await MovieRepository.getAll();

    return movies;
  }

  static getById = async (id) => {
    const movie = await MovieRepository.getById(id);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    return movie;
  }

  static create = async (fileImage, payload) => {
    const createPayload = {
      id: randomNumberId(),
      ...payload
    };

    if (fileImage) {
      const linkImage = `http://localhost:5000/images/${fileImage.filename}`;
      createPayload.photo = linkImage;
    }

    const movie = await MovieRepository.create(createPayload);

    return movie;
  }

  static updateById = async (id, fileImage, payload) => {
    const updatePayload = { ...payload };

    if (fileImage) {
      const linkImage = `http://localhost:5000/images/${fileImage.filename}`;
      updatePayload.photo = linkImage;
    }

    const movie = await MovieRepository.updateById(id, updatePayload);

    return movie;
  }

  static deleteById= async (id) => {
    await MovieRepository.deleteById(id);
  }
};

module.exports = MovieService;
