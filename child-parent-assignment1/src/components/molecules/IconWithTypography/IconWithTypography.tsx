import Icon from "../../atoms/Icon/Icon";
import Typography from "../../atoms/Typography/Typography";
import "./IconWithTypography.css";

interface IconWithTypographyProps {
  icon: string;
  text: string;
  active?: boolean;
  width?: string;
  iconHeight?: string;
  activeFilter?: string;
  inactiveFilter?: string;
  color?: string;
  activeColor?: string;
  fontSize?: string;
  fontWeight?: number;
  activeFontWeight?: number;
  fontFamily?: string;
}

const IconWithTypography = ({
  icon,
  text,
  active,
  width,
  iconHeight,
  activeFilter,
  inactiveFilter,
  color,
  activeColor,
  fontSize,
  fontWeight,
  activeFontWeight,
  fontFamily,
}: IconWithTypographyProps) => {
  return (
    <div
      className={`icon-with-typography ${
        active ? "icon-with-typography--active" : ""
      }`}
    >
      <Icon
        src={icon}
        active={active}
        width={width}
        height={iconHeight}
        activeFilter={activeFilter}
        inactiveFilter={inactiveFilter}
      />

      <Typography
        active={active}
        color={color}
        activeColor={activeColor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        activeFontWeight={activeFontWeight}
        fontFamily={fontFamily}
      >
        {text}
      </Typography>
    </div>
  );
};

export default IconWithTypography;
