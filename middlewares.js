import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next();// 다음 함수로 넘어간다는 뜻
};