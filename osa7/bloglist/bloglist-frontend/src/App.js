import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import Notification from "./components/Notification";
import Blogi from "./components/Blogi";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./NotificationContext";
import { useUser } from "./LoginContext";
import { updateBlog } from "./services/blogs";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Table, Form, Button } from "react-bootstrap";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [users, setUsers] = useState([]);

  const queryClient = useQueryClient();
  const { dispatch: notificationDispatch } = useNotification();
  const { dispatch: userDispatch } = useUser();
  const { user } = useUser();

  useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    onSuccess: (blogs) => setBlogs(blogs),
  });

  useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
    onSuccess: (users) => setUsers(users),
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      userDispatch({ type: "SET_USER", payload: user });
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      userDispatch({ type: "SET_USER", payload: user });

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `User ${user.name} logged in`, type: "success" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

      setUsername("");
      setPassword("");
    } catch (exception) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `Wrong username or password`, type: "error" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
      console.log(loggedUserJSON);
      window.localStorage.removeItem("loggedBlogappUser");
      userDispatch({ type: "REMOVE_USER" });

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `User ${user.name} logged out`, type: "success" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `logging out failed`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      console.log("BLOGI:", returnedBlog);

      returnedBlog.user = {
        id: user.id,
        name: user.name,
        username: user.username,
      };
      setBlogs(blogs.concat(returnedBlog));

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
          type: "success",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `a new blog '${blogObject.title}' by ${blogObject.author} can't be added`,
          type: "error",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Failed to update the blog:", error);
    },
  });

  const toggleLikes = (id) => {
    console.log("moi", id);
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(changedBlog);
  };

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error("Failed to delete the blog:", error);
    },
  });

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />

            <Form.Label>password:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button id="login-button" type="submit" variant="primary">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  const LoggedUser = ({ user }) => {
    return (
      <em>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </em>
    );
  };

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div className="container">
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <LoggedUser user={user} />

        <h2>blogs</h2>
        <Notification message={errorMessage} successMessage={successMessage} />

        <Routes>
          <Route
            path="/"
            element={
              <Blogs
                blogs={blogs}
                addBlog={addBlog}
                blogFormRef={blogFormRef}
              />
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route
            path="/blogs/:id"
            element={<Blogi blogs={blogs} toggleLikes={toggleLikes} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
