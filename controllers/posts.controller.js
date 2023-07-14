const { where } = require("sequelize");
const PostService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  constructor() {
    this.postService = new PostService();
  }

  // 게시글 생성
  createPost = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;

    const createPostData = await this.postService.createPost(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({ data: createPostData });
  };

  // 게시글 목록 조회
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  // 게시글 상세조회
  getPost = async (req, res, next) => {
    const postId = req.params.id;
    const post = await this.postService.findOnePost(postId);

    res.status(200).json({ data: post });
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const post = await this.postService.findOnePost(postId);

    if (post.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await post.update({ title, content });

    res.status(201).json({ data: post });
  };

  // 게시글 삭제
  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    const post = await this.postService.findOnePost(postId);

    if (post.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await post.destroy();

    res.status(204).end();
  };
}

module.exports = PostsController;
