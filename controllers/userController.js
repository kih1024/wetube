import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};
export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do: Log user in
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

// authenticate 는 로그인 하는 일련의 과정이 있을것이다. 로그인 성공시 홈 실패시 로그인 페이지. 이때 passport에 있는 stragy(passport.initialize에서 passport.js을 실행하면서 stragy가 passprot에 등록됨.) 를 찾고 그에 따라 로그인을 진행한다고 생각하면됨.
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

// 깃허브 사이트가 사용자의 접근토큰과 데이터를 이 콜백함수로 보내준다.
// 사용자가 이 사이트에 이용하는걸 허락여부와 사용자 데이터를 확인하는 콜백함수
// 여기 cb는 passport에서 제공하는 콜백함수 이다.
export const githubLoginCallback = async (_, __, profile, cb) => {
  console.log("as");
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
