const { Comments } = require("../models");

class CommentsRepository {
  findAllComments = async () => {
    // ORM인 Sequelize에서 Comments 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Comments.findAll();

    return posts;
  };

  createComments = async (
    UserId,
    PostId,
    nickname,
    password,
    title,
    content
  ) => {
    // ORM인 Sequelize에서 Comments 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createCommentsData = await Comments.create({
      UserId,
      PostId,
      nickname,
      password,
      title,
      content,
    });

    return createCommentsData;
  };
}

module.exports = CommentsRepository;
