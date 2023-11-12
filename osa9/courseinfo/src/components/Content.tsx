import { CourseParts } from "../types";
import Part from "./Part";

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <div key={part.name}>
          <Part {...part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
