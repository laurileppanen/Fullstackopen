import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./NotificationContext";
import { useUser } from "./LoginContext";
import { updateBlog } from "./services/blogs";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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

  const Comment = ({ id, commentAdded }) => {
    const [comment, setComment] = useState("");

    const addComment = async (event) => {
      event.preventDefault();
      console.log("toimii");
      const returnedComment = await blogService.createComment(
        { content: comment },
        id,
      );
      commentAdded(returnedComment);
      setComment("");
    };

    return (
      <form onSubmit={addComment}>
        <div>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button>add comment</button>
        </div>
      </form>
    );
  };

  const Blogi = ({ blogs }) => {
    const id = useParams().id;
    const blog = blogs.find((n) => n.id === id);
    const [comments, setComments] = useState([]);

    useEffect(() => {
      if (blog) {
        blogService.getComments(blog.id).then((comments) => {
          setComments(comments);
        });
      }
    }, [blog]);

    const addCommentToState = (comment) => {
      setComments([...comments, comment]);
    };

    if (!blog) {
      return null;
    }
    return (
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <Link>{blog.url}</Link>
        <br />
        {blog.likes} likes
        <button onClick={() => toggleLikes(blog.id)}>like</button>
        <br />
        added by {blog.user.name}
        <h4>comments</h4>
        <Comment id={id} commentAdded={addCommentToState} />
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    );
  };

  const Blogs = ({ blogs }) => {
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <Blog key={blog.id} blog={blog} />
            </Link>
          ))}
      </div>
    );
  };

  const LoggedUser = ({ user }) => {
    return (
      <em>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </em>
    );
  };

  const Users = ({ users }) => {
    return (
      <div>
        <h3>Users</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ display: "flex" }}>
            <span style={{ width: "150px" }}></span>
            <strong>
              <span>blogs created</span>
            </strong>
          </li>
          {users.map((user) => (
            <li key={user.id} style={{ display: "flex" }}>
              <span style={{ width: "150px" }}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </span>
              <span>{user.blogs.length}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const padding = {
    padding: 5,
  };

  const User = ({ users }) => {
    const id = useParams().id;
    const user = users.find((n) => n.id === id);
    if (!user) {
      return null;
    }
    console.log("KÄYTTÄJÄ:", user);
    return (
      <div>
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Router>
      <div>
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
          <Route path="/" element={<Blogs blogs={blogs} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/blogs/:id" element={<Blogi blogs={blogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
