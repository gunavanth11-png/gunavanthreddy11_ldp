import type { ReactNode } from "react";
import Typography from "../../atoms/Typography";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const StatCard = ({ icon, title, value }: StatCardProps) => {
  return (
    <div
      style={{
        width: "220px",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #E5E5E5",
        background: "#fff",
      }}
    >
      <div style={{ fontSize: "28px" }}>
        {icon}
      </div>

      <div style={{ marginTop: "16px" }}>
        <Typography
          text={title}
          size="14px"
          weight={400}
        />
      </div>

      <div style={{ marginTop: "8px" }}>
        <Typography
          text={value}
          size="22px"
          weight={700}
        />
      </div>
    </div>
  );
};

export default StatCard;