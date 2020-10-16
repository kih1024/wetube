import express from "express";
import morgan from "morgan"; //접속 상태 표시 미들웨어
import helmet from "helmet"; // 보안 강화 미들웨어
import cookieParser from "cookie-parser"; //쿠키에 정보를 저장하기 위해
import bodyParser from "body-parser"; // body의 내용을 보기 위해
import { localsMiddleware } from "./middlewares";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import routes from "./routes";
// const express = require("express");
const app = express();

// const handleHome = (req, res) => res.send("Hello from my ass");

// const betweenHome = (req, res, next) => {
//     console.log("I'm between");
//     next();
// };
// function handleProfile(req, res){
//     res.send("You are on my profile");
// }
app.set("view engine", "pug");
// express.static("디렉토리") : 디렉토리에서 파일을 찾아서 내보내주는 미들웨어, 이걸 쓰는 이유는 express에서는 어떤 route에 접근을 할때 해당 route에 맞는 처리가 있는지 찾을것이기 떄문에.
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 미들웨어는 순서가 중요. 처리할 route 의 핸들러 앞에 둔다.이부분에 원하는 만큼 미들웨어를 둔다
app.use(helmet());
// app.get("/",handleHome);//이렇게 하면 응답이 없기때문에 무한로딩. request 를 해주면 respond도 해준다

app.use(localsMiddleware);

app.use(routes.home, globalRouter); // 누군가 routes.home에 접속하면 globalRouter 안에 routes를 모두 사용 할 수 있다는 의미, 즉 routes.home에서 globalRouter의 routes들을 접근 해야한다는 의미
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
