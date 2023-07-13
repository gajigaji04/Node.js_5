const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  findAllUser = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allUser = await this.userRepository.findAllUser();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allUser.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allUser.map((user) => {
      return {
        userId: user.userId,
        nickname: user.nickname,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  };

  createUser = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createUserData = await this.userRepository.createUser(
      nickname,
      password,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      userId: createUserData.null,
      nickname: createUserData.nickname,
      password: createUserData.password,
      createdAt: createUserData.createdAt,
      updatedAt: createUserData.updatedAt,
    };
  };
}

module.exports = UserService;
