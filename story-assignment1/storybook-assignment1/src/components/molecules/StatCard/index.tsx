import { ReactNode, CSSProperties } from "react";
import Typography from "../../atoms/Typography";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  className?: string;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  valueStyle?: CSSProperties;
}

const StatCard = ({
  icon,
  title,
  value,
  className,
  style,
  titleStyle,
  valueStyle,
}: StatCardProps) => {
  return (
    <div className={className} style={style}>
      {icon}

      <Typography
        text={title}
        style={titleStyle}
      />

      <Typography
        text={value}
        style={valueStyle}
      />
    </div>
  );
};

export default StatCard;
