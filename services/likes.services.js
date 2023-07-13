const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  postRepository = new LikeRepository();

  findAllLike = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allLike = await this.likeRepository.findAllLike();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allLike.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allLike.map((post) => {
      return {
        postId: like.postId,
        userId: like.userId,
        title: like.title,
        createdAt: like.createdAt,
        updatedAt: like.updatedAt,
      };
    });
  };

  createLike = async (userId, postId) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createLikeData = await this.likeRepository.createLike(userId, postId);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      userId: createLikeData.null,
      postId: createLikeData.null,
      createdAt: createLikeData.createdAt,
      updatedAt: createLikeData.updatedAt,
    };
  };
}

module.exports = LikeService;
