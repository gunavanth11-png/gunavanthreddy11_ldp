import Icon from "../../atoms/Icon/Icon";
import Typography from "../../atoms/Typography/Typography";
import Avatar from "../Avatar/Avatar";
import logoutIcon from "../../../assets/icons/logout.svg";
import "./ProfileCard.css";

interface ProfileCardProps {
  image: string;
  name: string;
  company: string;
  onLogout?: () => void;
}

const ProfileCard = ({ image, name, company, onLogout }: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <div className="profile-card-user">
        <Avatar
          src={image}
          alt={name}
        />

        <div className="profile-card-details">
          <Typography variant="subtitle">{name}</Typography>
          <Typography variant="caption">{company}</Typography>
        </div>
      </div>
      <div onClick={onLogout} className="profile-card-logout">
         <Icon src={logoutIcon} alt="logout" className="icon-logout" />
      </div>
    </div>
  );
};

export default ProfileCard;