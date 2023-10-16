import { gql, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });
  if (!props.show) {
    return null;
  }
  console.log("GENRE:", genre);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const Genre = () => {
    if (genre) {
      return (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      );
    }
  };

  const books = result.data.allBooks;
  console.log("BOOKIT", books);

  return (
    <div>
      <h2>books</h2>
      <Genre />
      <br />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre("refactoring")}>refactoring</button>
      <button onClick={() => setGenre("agile")}>agile</button>
      <button onClick={() => setGenre("patterns")}>patterns</button>
      <button onClick={() => setGenre("design")}>design</button>
      <button onClick={() => setGenre("crime")}>crime</button>
      <button onClick={() => setGenre("classic")}>classic</button>
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
