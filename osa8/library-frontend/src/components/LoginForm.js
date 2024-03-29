import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN, USER } from "../queries";

const LoginForm = ({ setToken, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    update: (cache, response) => {
      const loginData = response.data?.login;
      if (loginData) {
        cache.updateQuery({ query: USER }, (data) => {
          return {
            ...data,
            me: {
              username: loginData.username,
              favouriteGenre: loginData.favouriteGenre,
            },
          };
        });
      }
    },
  });

  useEffect(() => {
    if (result.data) {
      console.log("token");
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
