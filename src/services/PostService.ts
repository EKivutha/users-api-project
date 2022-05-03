import http from "../http-common";
const getAll = () => {
  return http.get("/posts");
};
const get = (id: any) => {
  return http.get(`/posts/${id}`);
};
const findPostByUserId = (userId: any) => {
  return http.get(`/posts?userId=${userId}`);
};
const PostService = {
  getAll,
  get,
  findPostByUserId
};
export default PostService;