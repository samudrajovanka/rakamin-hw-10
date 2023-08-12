const MovieService = require('../../services/MovieService');
const movieValidation = require('../../validations/movie');

class MovieController {
  static getAll = async (req, res, next) => {
    try {
      const movies = await MovieService.getAll();

      return res.status(200).json({
        success: true,
        message: 'Get movies success',
        data: {
          movies
        }
      });
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const movie = await MovieService.getById(id);

      return res.status(200).json({
        success: true,
        message: 'Get movie success',
        data: {
          movie
        }
      });
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      movieValidation.validateCreatePayload(req.body);

      const movie = await MovieService.create(req.file, req.body);

      return res.status(201).json({
        success: true,
        message: 'Create movie success',
        data: {
          movie
        }
      });
    } catch (error) {
      next(error);
    }
  };

  static updateById = async (req, res, next) => {
    try {
      movieValidation.validateUpdatePayload(req.body);

      const { id } = req.params;

      await MovieService.updateById(id, req.file, req.body);

      return res.status(200).json({
        success: true,
        message: 'Update movie success'
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteById = async (req, res, next) => {
    try {
      const { id } = req.params;

      await MovieService.deleteById(id);

      return res.status(200).json({
        success: true,
        message: 'Delete movie success'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MovieController;
