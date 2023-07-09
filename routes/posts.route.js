const express = require("express");
const { Posts, Likes } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 게시글 생성
router.post("/posts", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { title, content, nickname } = req.body;

  const post = await Posts.create({
    UserId: userId,
    title,
    content,
    nickname, //
  });

  return res.status(201).json({ data: post });
});

// 게시글 목록 조회
router.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: ["postId", "userID", "title", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

// 게시글 수정
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const { title, content } = req.body;

  try {
    const post = await Posts.findOne({
      where: { postId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    if (post.UserId !== userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글을 수정할 권한이 없습니다." });
    }

    await Posts.update(
      { title, content },
      {
        where: { postId },
      }
    );

    return res.status(200).json({ message: "게시글 수정을 완료하였습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "게시글 수정에 실패하였습니다." });
  }
});

// 게시글 삭제
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  try {
    const post = await Posts.findOne({
      where: { postId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    if (post.UserId !== userId) {
      return res
        .status(403)
        .json({ errorMessage: "게시글을 삭제할 권한이 없습니다." });
    }

    await Posts.destroy({
      where: { postId },
    });

    return res.status(200).json({ message: "게시글 삭제를 완료하였습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "게시글 삭제에 실패하였습니다." });
  }
});

// 좋아요 설정
router.put("/posts/:postId/like", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;

  try {
    // 포스트 찾기
    const post = await Posts.findOne({
      where: { postId },
    });

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    // 포스트에 좋아요 등록
    const existingLike = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });

    if (existingLike) {
      await existingLike.destroy();
      return res
        .status(200)
        .json({ message: "게시글 좋아요를 취소하였습니다." });
    } else {
      await Likes.create({ UserId: userId, PostId: postId });
      return res
        .status(200)
        .json({ message: "게시글 좋아요를 등록하였습니다." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

// 좋아요 게시글 조회
router.get("/posts/like", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;

  // 좋아요가 등록된 게시글 조회
  try {
    const likedPosts = await Likes.findAll({
      where: { UserId: userId },
      include: [Posts],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ data: likedPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
