import http from "../http-common";
const getAll = () => {
  return http.get("/users");
};
const get = (id: Number) => {
  return http.get(`/users/${id}`);
};
const findByTitle = async (title: String) => {
  const result = await http.get(`/users?name=${title}`)
  console.log(result, title)
  return result;
};
const UserService = {
  getAll,
  get,
  findByTitle
};
export default UserService;