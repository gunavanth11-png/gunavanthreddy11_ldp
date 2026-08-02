import Icon from "../atoms/Icon";
import Typography from "../atoms/Typography";

interface IconWithTypographyProps {
  icon: string;
  text: string;
  active?: boolean;
}

const IconWithTypography = ({
  icon,
  text,
  active = false,
}: IconWithTypographyProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",

        height: "48px",
        padding: "0 14px",

        borderRadius: "8px",

        backgroundColor: active
          ? "#F1EEFF"
          : "transparent",
      }}
    >
      <Icon
        src={icon}
        active={active}
      />

      <Typography active={active}>
        {text}
      </Typography>
    </div>
  );
};

export default IconWithTypography;