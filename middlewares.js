import multer from "multer";
import routes from "./routes";

// multer : 영상파일을 넣으면 영상 파일의 url을 반환하려고 쓴거다.
const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log(req.user);
  next(); // 다음 함수로 넘어간다는 뜻
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

//  이 single 함수는 파일을 해당 dest에 저장하고 req.file에 파일 정보를 저장한다. 그래서 컨트롤러에서 file.path를 통해서 영상 url을 가져 올수 있다.
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
