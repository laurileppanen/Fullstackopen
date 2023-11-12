import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
            <br />
            <span style={{ fontStyle: "italic" }}>{props.description}</span>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
            <br />
            project exercises {props.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
            <br />
            {props.description} <br />
            submit to {props.backgroundMaterial}
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {props.name} {props.exerciseCount}
            </b>
            <br />
            {props.description} <br />
            required skills: {props.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(props);
  }
};

export default Part;
