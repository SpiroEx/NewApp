import { MyUser } from "@/classes/MyUser";
import Avatar from "../templates/Avatar";
import getAge from "@/myfunctions/getAge";

interface ProfileBarProps {
  myUser: MyUser | null;
}

const ProfileBar: React.FC<ProfileBarProps> = ({ myUser }) => {
  const age = getAge(myUser?.birthdate.toDate() ?? new Date());
  const gender = myUser?.gender;
  const height = myUser?.height;

  return (
    <div className="css-4 py-2 px-2 b b-light_gray rounded-2xl">
      <div className="wf rss-4">
        <Avatar src={myUser?.photoURL} size={50} />
        <div className="css-1">
          <p className="t53">{myUser?.name}</p>
          <p className="t32 o-50">{myUser?.email}</p>
        </div>
      </div>
      <div className="wf ras-4">
        <div className="rse-1">
          <p className="t44">Age:</p>
          <p className="t32 o-75">{age}</p>
        </div>
        <div className="rse-1">
          <p className="t44">Gender:</p>
          <p className="t32 o-75">{gender}</p>
        </div>
        <div className="rse-1">
          <p className="t44">Height:</p>
          <p className="t32 o-75">{height} cm</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
