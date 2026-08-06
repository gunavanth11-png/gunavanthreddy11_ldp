interface IconProps {
  src: string;
  active?: boolean;
  width?: string;
  height?: string;
  activeFilter?: string;
  inactiveFilter?: string;
}

const Icon = ({
  src,
  active,
  width,
  height,
  activeFilter,
  inactiveFilter,
}: IconProps) => {
  return (
    <img
      src={src}
      alt=""
      style={{
        width,
        height,
        filter: active ? activeFilter : inactiveFilter,
      }}
    />
  );
};

export default Icon;