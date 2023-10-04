import { Link } from "react-router-dom";

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

export default Users;
