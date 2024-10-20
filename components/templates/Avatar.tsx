import { twMerge } from "tailwind-merge";
import AvatarGirl from "../svg/icon/AvatarGirl";

interface AvatarProps {
  src?: string;
  size?: number;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 75, onClick }) => {
  return (
    <div
      className={twMerge("rounded-full overflow-hidden")}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      {src ? <img alt="not found" src={src} /> : <AvatarGirl size={size} />}
    </div>
  );
};

export default Avatar;
