import Icon from "../../atoms/Icon/Icon";
import Typography from "../../atoms/Typography/Typography";

interface IconWithTypographyProps {
  icon: string;
  text: string;
  active?: boolean;

  gap?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;

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
  gap,
  height,
  padding,
  borderRadius,
  activeBackgroundColor,
  inactiveBackgroundColor,
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
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        height,
        padding,
        borderRadius,
        backgroundColor: active
          ? activeBackgroundColor
          : inactiveBackgroundColor,
      }}
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