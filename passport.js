import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// 로그인 하는 방식을 정한다. 이경우 passport-local-mongoose가 제공하는 strategy(username password)를 사용하려고 한다.
passport.use(User.createStrategy());

// passport.authenticate("github")를 호출 하면 이 경우 깃허브 strategy를 사용한다.
//routes.githubCallback 에 대한 처리인 passport.authenticate("github", { failureRedirect: "/login" })가 실행이 되고 사용자가 동의 했다면 사전에 strategy에 등록된 githubLoginCallback로 사용자 access토큰과 사용자 정보를 보내고 이 githubLoginCallback에서 다시 응답(콜백함수cb(user object)로 응답한다)을 보내면 passport는 user ID를 쿠키에 넣어줄 것이고 username+password(local 방식) 인증때와 똑같은걸 해준다. passport.authenticate("github", { failureRedirect: "/login" })가 정상적으로 처리가 된것이다. 그렇게 되면 이후 postGithubLogIn가 실행되면 home 화면을 띄우게 된다.
//
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://127.0.0.1:7000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// 아래 serializeUser 는 User 컬렉션(테이블)의 _id만 쿠키에 담든 역할을하고 세션에 _id를 저장한다.
// deserializeUser 는 브라우저로부터 쿠키를 받아서 쿠키의 정보를 통해 _id를 확인해 어떤 사용자인지 확인한다.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
