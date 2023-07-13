const { Likes } = require("../models");

class LikesRepository {
  findAllLikes = async () => {
    // ORM인 Sequelize에서 likes 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const likes = await Likes.findAll();

    return likes;
  };

  createLikes = async (UserId, PostId) => {
    // ORM인 Sequelize에서 Users 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createLikesData = await Likes.create({
      UserId,
      PostId,
    });

    return createLikesData;
  };
}

module.exports = LikesRepository;
