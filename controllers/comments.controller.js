const CommentService = require("../services/comments.service");

// Comment의 컨트롤러(Controller)역할을 하는 클래스
class CommentsController {
  commentService = new CommentService(); // Comment 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getComments = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllComment 로직을 실행합니다.
    const comments = await this.postService.findAllComment();

    res.status(200).json({ data: comments });
  };

  createComment = async (req, res, next) => {
    const { userId, postId, commentId, title, createdAt, updatedAt } = req.body;

    // 서비스 계층에 구현된 createComment 로직을 실행합니다.
    const createCommentData = await this.commentService.createComment(
      userId,
      postId,
      commentId,
      title,
      createdAt,
      updatedAt
    );

    res.status(201).json({ data: createCommentData });
  };
}

module.exports = CommentsController;
