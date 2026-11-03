import type { ReactNode } from "react";
import Typography from "../../atoms/Typograpghy/Typograpghy";

export type StatCardVariant = "default" | "elevated" | "outlined";

export interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  variant?: StatCardVariant;
  className?: string;
}

const StatCard = ({
  icon,
  title,
  value,
  variant = "default",
  className = "",
}: StatCardProps) => {
  const cardClasses = [
    "stat-card",
    `stat-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses}>
      <div className="stat-card__icon" aria-hidden="true">
        {icon}
      </div>

      <div className="stat-card__content">
        <Typography
          as="span"
          className="stat-card__title"
          text={title}
          variant="caption"
          color="secondary"
          weight="medium"
        />

        <Typography
          as="h3"
          className="stat-card__value"
          text={String(value)}
          variant="h2"
          weight="bold"
          color="primary"
        />
      </div>
    </div>
  );
};

export default StatCard;