import Part, { PartProps } from "./Part";

interface ContentProps {
  course: PartProps[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.course.map((part) => (
        <Part name={part.name} exerciseCount={part.exerciseCount} />
      ))}
    </div>
  );
};

export default Content;
