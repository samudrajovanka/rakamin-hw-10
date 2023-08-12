const UserService = require('../../services/UserService');
const userValidation = require('../../validations/user');

class UserController {
  static create = async (req, res, next) => {
    try {
      userValidation.validateCreatePayload(req.body);

      const user = await UserService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          user
        }
      })
    } catch (error) {
      next(error);
    }
  }

  static getAll = async (req, res, next) => {
    try {
      const users = await UserService.getAll();

      return res.status(200).json({
        success: true,
        message: 'Get users success',
        data: {
          users
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  static getById = async (req, res, next) => {
    try {
      const user = await UserService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: 'Get user success',
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  };

  static updateById = async (req, res, next) => {
    try {
      userValidation.validateUpdatePayload(req.body);

      await UserService.updateById(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Update user success',
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteById = async (req, res, next) => {
    try {
      await UserService.deleteById(req.params.id);

      return res.status(200).json({
        success: true,
        message: 'Delete user success'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
