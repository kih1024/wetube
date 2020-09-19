export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) =>{
    // query 안에 있는 term을 가져오고 싶을때, 이건 req.query.term 을 한것과 같음.
    // 그리고 이것은 
    // const searchingBy = req.query.term 
    // 을 한거와 같다.
    const {query: { term : searchingBy }} = req
    res.render("search", { pageTitle: "Search", searchingBy });
}
export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });
export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "VideoDetail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "EditVideo" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "DeleteVideo" });
