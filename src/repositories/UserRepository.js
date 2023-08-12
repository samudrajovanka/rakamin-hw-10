const { user: User } = require("../api/models");
const { EMAIL_ALREADY_USED_ERR_MSG } = require("../constants/errorMessage");
const { CONFLICT_ERR } = require("../constants/errorType");
const { InvariantError, NotFoundError } = require("../exceptions");

class UserRepository {
  static create = async (payload) => {
    const existingUser = await UserRepository.getByEmail(payload.email);

    if (existingUser) {
      throw new InvariantError(EMAIL_ALREADY_USED_ERR_MSG, CONFLICT_ERR, 409);
    }

    const user = await User.create(payload);

    return user;
  }

  static getAll = async () => {
    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    });
    return users;
  }

  static getByEmail = async (email) => {
    const user = await User.findOne({
      where: {
        email
      },
      attributes: {
        exclude: ['password']
      }
    });

    return user;
  }

  static getById = async (id) => {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    });

    return user;
  }

  static updateById = async (id, payload) => {
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const existingUser = await UserRepository.getByEmail(payload.email);

    if (existingUser && existingUser.id !== +id) {
      throw new InvariantError(EMAIL_ALREADY_USED_ERR_MSG, CONFLICT_ERR, 409);
    }

    await User.update(payload, {
      where: {
        id
      }
    });
  }

  static deleteById = async (id) => {
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await User.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = UserRepository;