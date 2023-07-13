const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.route");
const postsRouter = require("./routes/posts.route");
const likesRouter = require("./routes/likes.route");
const commentsRouter = require("./routes/comments.route");
const app = express();
const { sequelize } = require("./models/index.js");
const PORT = 3018;

async function main() {
  // model을 이용해 데이터베이스에 테이블을 삭제 후 생성합니다.
  await sequelize.sync({ force: process.env.NODE_ENV === "development" });
}

main();

app.use(express.json());
app.use(cookieParser());
app.use("/api", [usersRouter, postsRouter, commentsRouter, likesRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
