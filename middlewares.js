import multer from "multer";
import routes from "./routes";

// multer : 영상파일에 넣으면 영상 파일의 url을 반환하려고 쓴거다.
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
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

//  이 single 함수는 req.file에 파일 정보를 저장한다.
export const uploadVideo = multerVideo.single("videoFile");
