import Heading from "../../atoms/Heading";

interface StudentCardProps {
  name: string;
  course: string;
}

const StudentCard = ({
  name,
  course,
}: StudentCardProps) => {
  return (
    <div>
      <Heading title={name} />
      <p>{course}</p>
    </div>
  );
};

export default StudentCard;