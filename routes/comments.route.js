const express = require("express");
const { Comments } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 댓글 생성
router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    const createdComment = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });

    return res.status(201).json({ data: createdComment });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "댓글 생성에 실패하였습니다." });
  }
});

// 댓글 목록 조회
router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comments.findAll({
      where: { PostId: postId },
      attributes: [
        "commentId",
        "UserId",
        "PostId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ data: comments });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "댓글 목록 조회에 실패하였습니다." });
  }
});

// 댓글 상세 조회
router.get("/posts/:postId/comments/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const comment = await Comments.findOne({
      where: { commentId, PostId: postId },
      attributes: [
        "commentId",
        "UserId",
        "PostId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!comment) {
      return res.status(404).json({ errorMessage: "댓글을 찾을 수 없습니다." });
    }

    return res.status(200).json({ data: comment });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "댓글 조회에 실패하였습니다." });
  }
});

// 댓글 수정
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    try {
      const [updatedRows] = await Comments.update(
        { comment },
        {
          where: { commentId, PostId: postId },
        }
      );

      if (updatedRows === 0) {
        return res
          .status(404)
          .json({ errorMessage: "댓글을 찾을 수 없습니다." });
      }

      const updatedComment = await Comments.findOne({
        where: { commentId, PostId: postId },
        attributes: [
          "commentId",
          "UserId",
          "PostId",
          "comment",
          "createdAt",
          "updatedAt",
        ],
      });

      return res.status(200).json({ data: updatedComment });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "댓글 수정에 실패하였습니다." });
    }
  }
);

// 댓글 삭제
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  async (req, res) => {
    const { postId, commentId } = req.params;

    try {
      const deletedComment = await Comments.destroy({
        where: { commentId, PostId: postId },
      });

      if (deletedComment === 0) {
        return res
          .status(404)
          .json({ errorMessage: "댓글을 찾을 수 없습니다." });
      }

      return res.status(200).json({ message: "댓글 삭제를 완료하였습니다." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "댓글 삭제에 실패하였습니다." });
    }
  }
);

module.exports = router;
