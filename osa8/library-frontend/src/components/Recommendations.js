import { useQuery } from "@apollo/client";
import { USER, ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const userResult = useQuery(USER);
  const booksResult = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  const allBooks = booksResult.data.allBooks;
  const genre = userResult.data.me.favouriteGenre;
  const books = allBooks.filter((book) => book.genres.includes(genre));

  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <strong> {genre} </strong>
      <br />
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
    </div>
  );
};

export default Recommendations;
