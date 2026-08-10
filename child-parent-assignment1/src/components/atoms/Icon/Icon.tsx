interface IconProps {
  src: string;
  alt: string;
  active?: boolean;
  width?: string;
  height?: string;
  activeFilter?: string;
  inactiveFilter?: string;
}

const Icon = ({
  src,
  alt,
  active,
  width,
  height,
  activeFilter,
  inactiveFilter,
}: IconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        filter: active ? activeFilter : inactiveFilter,
      }}
    />
  );
};

export default Icon;

export default Icon;
