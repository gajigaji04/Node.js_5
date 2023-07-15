const express = require("express");
const { Posts, Likes, Users } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 게시글 좋아요
// 게시글 좋아요
router.post("/posts/:postId/like", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;

  try {
    const post = await Posts.findOne({
      where: { postId: postId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    const existingLike = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });

    if (existingLike) {
      await Likes.destroy({
        where: { UserId: userId, PostId: postId },
      });

      await post.decrement("likedPostsCount");

      const updatedPost = await Posts.findOne({
        where: { postId: postId },
      });

      return res.status(200).json({
        message: "게시글 좋아요를 취소하였습니다.",
        likedPostsCount: updatedPost.likedPostsCount,
      });
    } else {
      await Likes.create({ UserId: userId, PostId: postId });

      await post.increment("likedPostsCount");

      const updatedPost = await Posts.findOne({
        where: { postId: postId },
      });

      return res.status(200).json({
        message: "게시글 좋아요를 등록하였습니다.",
        likedPostsCount: updatedPost.likedPostsCount - 1, // Decrease by 1 since it starts at 0
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: "서버 오류" });
  }
});

// 좋아요 게시글 조회
router.get("/like", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;

  try {
    const likedPosts = await Likes.findAll({
      where: { UserId: userId },
      include: {
        model: Posts,
        attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    // ".map()" 함수를 이용 => 게시물 객체 추출
    const posts = likedPosts.map((likedPost) => likedPost.Post);

    // 좋아요를 누른 게시물이 없는 경우 빈 배열 반환
    if (posts.length === 0) {
      return res.status(200).json({ data: [] }); // 빈 배열 반환
    }

    // 데이터베이스 쿼리 중 오류 발생, 다른 서버 오류 발생 시 500 상태 코드 반환
    return res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: "서버 오류" });
  }
});

module.exports = router;
