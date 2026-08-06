interface AvatarProps {
  image: string;
  name: string;
  company: string;
  gap?: string;
  imageWidth?: string;
  imageHeight?: string;
  borderRadius?: string;
  nameColor?: string;
  nameFontSize?: string;
  nameFontWeight?: number;
  companyColor?: string;
  companyFontSize?: string;
}

const Avatar = ({
  image,
  name,
  company,
  gap,
  imageWidth,
  imageHeight,
  borderRadius,
  nameColor,
  nameFontSize,
  nameFontWeight,
  companyColor,
  companyFontSize,
}: AvatarProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap,
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: imageWidth,
          height: imageHeight,
          borderRadius,
        }}
      />

      <div>
        <div
          style={{
            color: nameColor,
            fontSize: nameFontSize,
            fontWeight: nameFontWeight,
          }}
        >
          {name}
        </div>

        <div
          style={{
            color: companyColor,
            fontSize: companyFontSize,
          }}
        >
          {company}
        </div>
      </div>
    </div>
  );
};

export default Avatar;