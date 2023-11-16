import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
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
