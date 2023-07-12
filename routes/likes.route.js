const express = require("express");
const { Posts, Likes, Users } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 좋아요 설정
router.post("/posts/:postId/like", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;

  let likedPostsCount = 0;

  try {
    const post = await Posts.findOne({
      where: { postId: postId },
    });

    // 게시글이 존재하지 않을 경우 반환
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    const existingLike = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });

    // 게시글 좋아요 추가 및 취소
    if (existingLike) {
      await Likes.destroy({
        where: { UserId: userId, PostId: postId },
      });

      // 좋아요 카운트 -1
      const decrementLikedPostsCount = function () {
        likedPostsCount = likedPostsCount - 1;
        return likedPostsCount;
      };

      return res
        .status(200)
        .json({ message: "게시글 좋아요를 취소하였습니다.", likedPostsCount });
    } else {
      await Likes.create({ UserId: userId, PostId: postId });

      // 좋아요 카운트 +1
      const incrementLikedPostsCount = function () {
        likedPostsCount = likedPostsCount + 1;
        return likedPostsCount;
      };

      return res
        .status(200)
        .json({ message: "게시글 좋아요를 등록하였습니다.", likedPostsCount });
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
    const LikedPosts = await Likes.findAll({
      where: { UserId: userId },
      include: {
        model: Posts,
        attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    // ".map()" 함수를 이용 => 게시물 객체 추출
    const posts = LikedPosts.map((likedPost) => likedPost.Post);

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
