const { where } = require("sequelize");
const CommentService = require("../services/comments.service");

// Comment의 컨트롤러(Controller)역할을 하는 클래스
class CommentsController {
  constructor() {
    this.commentService = new CommentService();
  }

  // 댓글 생성
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    const createCommentData = await this.commentService.createComment(
      userId,
      postId,
      comment
    );

    res.status(201).json({ data: createCommentData });
  };

  // 댓글 목록 조회
  getComments = async (req, res, next) => {
    const comments = await this.commentService.findAllComment();

    res.status(200).json({ data: comments });
  };

  // 댓글 상세조회
  getComment = async (req, res, next) => {
    const commentId = req.params.id;
    const comment = await this.commentService.findOneComment(commentId);

    res.status(200).json({ data: comment });
  };

  // 댓글 수정
  updateComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;

    const existingComment = await this.commentService.findOneComment(commentId);

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    existingComment.comment = comment;
    await existingComment.save();

    res.status(200).json({ data: existingComment });
  };

  // 댓글 삭제
  deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;

    const existingComment = await this.commentService.findOneComment(commentId);

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await existingComment.destroy();

    res.status(204).end();
  };
}

module.exports = CommentsController;
