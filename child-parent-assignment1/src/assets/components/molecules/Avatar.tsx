interface AvatarProps {
  image: string;
  name: string;
  company: string;
}

const Avatar = ({
  image,
  name,
  company,
}: AvatarProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={image}
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
        }}
      />

      <div>
        <div
          style={{
            color:"#333333",
            fontSize:"14px",
            fontWeight:600,
          }}
        >
          {name}
        </div>

        <div
          style={{
            color:"#999999",
            fontSize:"12px",
          }}
        >
          {company}
        </div>
      </div>
    </div>
  );
};

export default Avatar;