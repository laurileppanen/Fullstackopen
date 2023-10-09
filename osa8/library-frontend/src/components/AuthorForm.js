import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

import Select from "react-select";
import { useQuery } from "@apollo/client";

const AuthorForm = () => {
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [changeBorn] = useMutation(EDIT_AUTHOR);

  const names = result.data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));
  const [selectedName, setSelectedName] = useState(null);

  const submit = async (event) => {
    event.preventDefault();

    changeBorn({
      variables: { name: selectedName.value, setBornTo: parseInt(born) },
    });

    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={names}
          />
        </div>

        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
