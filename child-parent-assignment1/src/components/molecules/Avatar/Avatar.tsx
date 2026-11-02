import Icon from "../../atoms/Icon/Icon";
import "./Avatar.css";

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ src, alt, className = "" }: AvatarProps) => {
  return (
    <div className={`avatar-container ${className}`}>
      <Icon src={src} alt={alt} className="avatar-image" />
    </div>
  );
};

export default Avatar;
