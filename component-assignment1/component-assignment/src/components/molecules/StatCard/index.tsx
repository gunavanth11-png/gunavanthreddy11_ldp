import { ReactNode } from "react";
import Typography from "../../atoms/Typography";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const StatCard = ({
  icon,
  title,
  value,
}: StatCardProps) => {
  return (
    <div
      style={{
        width: "220px",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ fontSize: "24px" }}>
        {icon}
      </div>

      <Typography
        text={title}
        color="#777"
      />

      <Typography
        text={value}
        size="24px"
        weight={700}
      />
    </div>
  );
};

export default StatCard;