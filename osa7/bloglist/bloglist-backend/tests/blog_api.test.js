const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("salainen", 10);
  const user = new User({
    username: "teme1717",
    name: "Teemu Lehtiö",
    blogs: [],
    passwordHash,
  });

  await user.save();
}, 60000);

beforeEach(async () => {
  await Blog.deleteMany({});

  const users = await User.find({});
  const id = users[0]._id;

  const blogObject = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        _id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: id.toString(),
        likes: blog.likes ? blog.likes : 0,
      }),
  );

  const blogPromises = blogObject.map((blog) => blog.save());
  await Promise.all(blogPromises);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body[0].id);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("the identifyer id is defined", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Elämäni johtajana",
    author: "Teemu Lehtiö",
    url: "http://localhost:3003/api/blogs",
    likes: 10000,
  };

  const loginUser = {
    username: "teme1717",
    password: "salainen",
  };

  const loginResponse = await api.post("/api/login").send(loginUser);

  const token = loginResponse.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const authors = response.body.map((blog) => blog.author);

  console.log(response.body[2].likes);
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

  expect(authors).toContain("Teemu Lehtiö");
}, 60000);

test("if the likes property is missing, make sure it is saved as 0", async () => {
  const newBlog = {
    title: "Elämäni Karssonina",
    author: "Matias Karlsson",
    url: "http://localhost:3003/api/blogs",
  };

  const loginUser = {
    username: "teme1717",
    password: "salainen",
  };

  const loginResponse = await api.post("/api/login").send(loginUser);

  const token = loginResponse.body.token;

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("there is no title", async () => {
  const newBlog = {
    author: "Ilkka Uusipaikka",
    url: "http://localhost:3003/api/blogs",
  };

  const loginUser = {
    username: "teme1717",
    password: "salainen",
  };

  const loginResponse = await api.post("/api/login").send(loginUser);

  const token = loginResponse.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("there is no url", async () => {
  const newBlog = {
    author: "Onni hermanni",
    title: "Mekonomenin omenapoika",
  };

  const loginUser = {
    username: "teme1717",
    password: "salainen",
  };

  const loginResponse = await api.post("/api/login").send(loginUser);

  const token = loginResponse.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("succeeds with the deletion of a blog", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const noteToDelete = { ...blogsAtStart[0], _id: blogsAtStart[0].id };
  console.log(noteToDelete);

  const loginUser = {
    username: "teme1717",
    password: "salainen",
  };

  const loginResponse = await api.post("/api/login").send(loginUser);

  const token = loginResponse.body.token;

  await api
    .delete(`/api/blogs/${noteToDelete._id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const response = await api.get("/api/blogs");
  const blogs = response.body;

  const authors = blogs.map((blog) => blog.author);
  console.log(authors);
  expect(authors).not.toContain(noteToDelete.author);
});

test("blog modified", async () => {
  const currentBlogs = await helper.blogsInDb();
  const updateBlog = currentBlogs[0];
  updateBlog.likes = 91245;
  console.log("UPDATED:", updateBlog);

  await api.put(`/api/blogs/${updateBlog.id}`).send(updateBlog).expect(200);

  const response = await api.get("/api/blogs");
  expect(response.body[0].likes).toBe(91245);
});

describe("there are new users at db", () => {
  test("less than 3 signs username not able to create", async () => {
    const newUser = {
      username: "ai",
      name: "lauri",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username must be at least 3 signs long",
    );
  });

  test("less than 3 signs password not able to create", async () => {
    const newUser = {
      username: "aila",
      name: "lauri",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 signs long",
    );
  });

  test("username must be unique", async () => {
    const newUser = {
      username: "teme1717",
      name: "Teemu Lehtiö",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    console.log(result.body.error);

    expect(result.body.error).toContain(
      "User validation failed: username: Error, expected `username` to be unique. Value: `teme1717`",
    );
  });
}, 60000);

test("adding a new blog without a token returns 401 Unauthorized", async () => {
  const newBlog = {
    title: "No token",
    author: "UntiToken",
    url: "https://notoken.com",
    likes: 87,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
