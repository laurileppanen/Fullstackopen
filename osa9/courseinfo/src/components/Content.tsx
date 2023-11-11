interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CourseParts {
  courseParts: CoursePart[];
}

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Content;
