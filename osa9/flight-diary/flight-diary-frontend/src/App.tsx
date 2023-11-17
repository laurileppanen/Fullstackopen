import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const data = await createDiary({
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment,
      });
      if (data) {
        setDiaries(diaries.concat(data));
      }
    } catch (error) {
      setErrorMessage(String(error));
    }
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {<div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={diaryCreation}>
        date
        <input value={date} onChange={(event) => setDate(event.target.value)} />
        <br />
        visibility
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />
        weather
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br />
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>

      <h2>Diary Entries</h2>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          visibility: {diary.visibility} <br />
          weather: {diary.weather} <br />
          comment: {diary.comment}
        </div>
      ))}
    </div>
  );
};

export default App;
