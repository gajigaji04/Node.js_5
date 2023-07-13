const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allComment = await this.commentRepository.findAllComment();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allComment.map((Comment) => {
      return {
        userId: comment.userId,
        postId: comment.postId,
        commentId: comment.commentId,
        nickname: comment.nickname,
        title: comment.title,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  createComment = async (title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createCommentData = await this.commentRepository.createComment(
      userId,
      postId,
      commentId,
      title,
      createdAt,
      updatedAt
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      userId: createCommentData.null,
      postId: createCommentData.null,
      commentId: createCommentData.null,
      title: createCommentData.title,
      content: createCommentData.content,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };
}

module.exports = CommentService;
