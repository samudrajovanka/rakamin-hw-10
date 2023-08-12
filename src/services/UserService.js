const bcrypt = require('bcrypt');

const UserRepository = require('../repositories/userRepository');
const { randomNumberId } = require('../utils/common');
const { NotFoundError } = require('../exceptions');

class UserService {
  static create = async (payload) => {
    const passwordHash = await bcrypt.hash(payload.password, 10);

    const user = await UserRepository.create({
        id: randomNumberId(),
        ...payload,
        password: passwordHash
    });

    const userWithoutPassword = { ...user.toJSON() }
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  static getAll = async () => {
    const users = await UserRepository.getAll();

    return users;
  }

  static getById = async (id) => {
    const user = await UserRepository.getById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  static updateById = async (id, payload) => {
    await UserRepository.updateById(id, payload)
  }

  static deleteById = async (id) => {
    await UserRepository.deleteById(id);
  }
};

module.exports = UserService;
