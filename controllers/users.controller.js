const UserService = require("../services/users.service");

// User의 컨트롤러(Controller)역할을 하는 클래스
class UsersController {
  constructor() {
    this.userService = new UserService();
  }

  // 로그인
  postUsers = async (req, res, next) => {
    // 서비스 계층에 구현된 로그인 로직을 실행합니다.
    const { nickname, password } = req.body;
    const user = await this.userService.login(nickname, password);

    res.status(200).json({ data: user });
  };

  // 회원가입
  createUser = async (req, res, next) => {
    const { nickname, password } = req.body;

    // 서비스 계층에 구현된 회원가입 로직을 실행합니다.
    const createUserData = await this.userService.createUser(
      nickname,
      password
    );

    res.status(201).json({ data: createUserData });
  };
}

module.exports = UsersController;
