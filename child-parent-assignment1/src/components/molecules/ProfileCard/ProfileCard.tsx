import Icon from "../../atoms/Icon/Icon";
import "./ProfileCard.css";

interface ProfileCardProps {
  image: string;
  name: string;
  company: string;
}

const ProfileCard = ({ image, name, company }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <Icon
        src={image}
        alt={name}
        width="38px"
        height="38px"
        borderRadius="50%"
      />

      <div>
        <div className="profile-card-name">{name}</div>
        <div className="profile-card-company">{company}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
