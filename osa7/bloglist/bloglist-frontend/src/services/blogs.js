import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const updateBlog = (updatedBlog) => {
  console.log("UPDATED:", updatedBlog);
  axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    .then((res) => res.data);
};

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  console.log(response);
  return response.data;
};

export default { getAll, create, remove, setToken };
