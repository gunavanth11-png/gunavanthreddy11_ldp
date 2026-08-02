interface IconProps {
  src: string;
  active?: boolean;
}

const Icon = ({
  src,
  active = false,
}: IconProps) => {
  return (
    <img
      src={src}
      style={{
        width: "20px",
        height: "20px",

    
        filter: active
          ? "brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(3000%)"
          : "none",
      }}
    />
  );
};

export default Icon;