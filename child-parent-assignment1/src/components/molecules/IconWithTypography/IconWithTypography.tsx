import Icon from "../../atoms/Icon/Icon";
import Typography from "../../atoms/Typography/Typography";
import "./IconWithTypography.css";

interface IconWithTypographyProps {
  icon: string;
  text: string;
  active?: boolean;
  className?: string;
}

const IconWithTypography = ({
  icon,
  text,
  active,
  className = "",
}: IconWithTypographyProps) => {
 return (
  <div className={`icon-with-typography ${active ? "active" : ""} ${className}`}>
    <Icon
        src={icon}
        alt={text}
        active={active}
      />
    <Typography
      active={active}
      variant="body"
    >
      {text}
    </Typography>
  </div>
  );
};

export default IconWithTypography;