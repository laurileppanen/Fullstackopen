const User = require("../models/user");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    userId: "641653709f62f29c93b55ecf",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    userId: "641653709f62f29c93b55ecf",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 12,
    __v: 0,
  },
];

const initialUsers = [
  {
    username: "teme1717",
    name: "Teemu Lehtiö",
    password: "salainen",
  },
];

module.exports = {
  usersInDb,
  blogsInDb,
  initialBlogs,
  initialUsers,
};
