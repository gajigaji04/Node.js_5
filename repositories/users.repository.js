const { Users } = require("../models");

class UserRepository {
  findAllUser = async () => {
    // ORM인 Sequelize에서 Users 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const users = await Users.findAll();

    return users;
  };

  createUser = async (nickname, password) => {
    // ORM인 Sequelize에서 Users 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createUserData = await Users.create({
      nickname,
      password,
    });

    return createUserData;
  };
}

module.exports = UserRepository;
