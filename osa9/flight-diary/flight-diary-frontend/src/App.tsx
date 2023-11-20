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

  const visibilitySelected = (value: string) => {
    console.log("VALUE:", value);
    setVisibility(value);
  };

  const weatherSelected = (value: string) => {
    console.log("VALUE:", value);
    setWeather(value);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {<div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={diaryCreation}>
        date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility: <label>great</label>
        <input
          name="visibility"
          type="radio"
          onChange={() => visibilitySelected("great")}
          checked={visibility === "great"}
        />
        <label>good</label>
        <input
          name="visibility"
          type="radio"
          onChange={() => visibilitySelected("good")}
          checked={visibility === "good"}
        />
        <label>ok</label>
        <input
          name="visibility"
          type="radio"
          onChange={() => visibilitySelected("ok")}
          checked={visibility === "ok"}
        />
        <label>poor</label>
        <input
          name="visibility"
          type="radio"
          onChange={() => visibilitySelected("poor")}
          checked={visibility === "poor"}
        />
        <br />
        weather: <label>sunny</label>
        <input
          name="weather"
          type="radio"
          onChange={() => weatherSelected("sunny")}
          checked={weather === "sunny"}
        />
        <label>rainy</label>
        <input
          name="weather"
          type="radio"
          onChange={() => weatherSelected("rainy")}
          checked={weather === "rainy"}
        />
        <label>cloudy</label>
        <input
          name="weather"
          type="radio"
          onChange={() => weatherSelected("cloudy")}
          checked={weather === "cloudy"}
        />
        <label>stormy</label>
        <input
          name="weather"
          type="radio"
          onChange={() => weatherSelected("stormy")}
          checked={weather === "stormy"}
        />
        <label>windy</label>
        <input
          name="weather"
          type="radio"
          onChange={() => weatherSelected("windy")}
          checked={weather === "windy"}
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
