const UserService = require("../services/users.service");

// User의 컨트롤러(Controller)역할을 하는 클래스
class UsersController {
  userService = new UserService(); // User 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getUsers = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllUser 로직을 실행합니다.
    const users = await this.userService.findAllUser();

    res.status(200).json({ data: users });
  };

  createUser = async (req, res, next) => {
    const { nickname, password } = req.body;

    // 서비스 계층에 구현된 createUser 로직을 실행합니다.
    const createUserData = await this.UserService.createPost(
      nickname,
      password
    );

    res.status(201).json({ data: createUserData });
  };
}

module.exports = UsersController;
