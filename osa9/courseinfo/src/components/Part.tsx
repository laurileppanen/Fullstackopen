export interface PartProps {
  name: string;
  exerciseCount: number;
}

const Part = (props: PartProps) => {
  return (
    <div>
      <p>
        {props.name} {props.exerciseCount}
      </p>
    </div>
  );
};

export default Part;
