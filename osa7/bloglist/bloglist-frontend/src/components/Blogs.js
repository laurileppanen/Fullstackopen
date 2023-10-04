import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Blogs = ({ blogs, addBlog, blogFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    <Blog key={blog.id} blog={blog} />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
