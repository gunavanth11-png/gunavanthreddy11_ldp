import "./Icon.css";

interface IconProps {
  src: string;
  alt: string;
  active?: boolean;
  className?: string;
}

const Icon = ({
  src,
  alt,
  active,
  className = "",
}: IconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`icon ${active ? "icon-active" : ""} ${className}`}
    />
  );
};

export default Icon;