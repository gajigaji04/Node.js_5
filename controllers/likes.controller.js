const LikeService = require("../services/likes.service");

// Like의 컨트롤러(Controller)역할을 하는 클래스
class LikesController {
  likeService = new LikeService(); // Like 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getLikes = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllLike 로직을 실행합니다.
    const likes = await this.likeService.findAllLike();

    res.status(200).json({ data: likes });
  };

  createLikes = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;

    // 서비스 계층에 구현된 createLike 로직을 실행합니다.
    const createLikeData = await this.likeService.createLike(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({ data: createLikeData });
  };
}

module.exports = LikesController;
