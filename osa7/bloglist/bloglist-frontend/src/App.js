import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./NotificationContext";
import { updateBlog } from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
    onSuccess: (blogs) => setBlogs(blogs),
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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
      setUser(user);

      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `User ${user.name} logged in`, type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

      console.log("moi2");

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `Wrong username or password`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
      console.log(loggedUserJSON);
      setUser(null);
      window.localStorage.removeItem("loggedBlogappUser");
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `User ${user.name} logged in`, type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      dispatch({
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

      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `a new blog '${blogObject.title}' by ${blogObject.author} can't be added`,
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
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
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    console.log("moi", typeof id);
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

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} successMessage={successMessage} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            toggleLikes={() => toggleLikes(blog.id)}
            handleDelete={deleteBlog}
            userLoggedIn={user.username}
          />
        ))}
    </div>
  );
};

export default App;
