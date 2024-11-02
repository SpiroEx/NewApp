import { useContext } from "react";
import Avatar from "../templates/Avatar";
import MyButton from "../templates/MyButton";
import { dateFormatter } from "@/myfunctions/dateFormatter";
import PhoneIcon from "../svg/icon/PhoneIcon";
import MyBottomSheet from "../templates/MyBottomSheet";
import { FHContext } from "@/app/templates/FH_Wrapper";
import { useAddress } from "@/hooks/useAddress";
import WarningIcon from "../svg/icon/WarningIcon";

interface EmergencyBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  latitude: number;
  longitude: number;
  emergencyTimestamp: Date;
}

const EmergencyBottomSheet: React.FC<EmergencyBottomSheetProps> = ({
  open,
  onClose,
  latitude,
  longitude,
  emergencyTimestamp,
}) => {
  const { device } = useContext(FHContext);

  const address = useAddress(latitude, longitude);

  return (
    <MyBottomSheet open={open} onClose={onClose}>
      <div className="csc px-5">
        {/*//! Child Info Card  */}
        <div className="rsc-4 bg-zinc-200 rounded-xl px-3 py-3 wf">
          <WarningIcon />
          <div className="css-1">
            <p className="t6">Emergency!</p>
          </div>
        </div>

        {/*//! Need Help */}
        <div className="csc-3 mt-8 tc mb-10">
          <p className="t-red-500 tf6">Need Help</p>
          <p className="t-zinc-700 t36">{address}</p>
          <p className="t-zinc-400 t2">
            {device && dateFormatter(emergencyTimestamp)}
          </p>
        </div>

        {/*//! Call Police */}
        {/* <div className="rbs wf mt-10 mb-8">
          <div className="css-1">
            <p className="t2 t-zinc-400">Phone Number</p>
            <div className="rsc-1">
              <PhoneIcon size={12} />
              <p className="t2 t-zinc-400">09999</p>
            </div>
          </div>
        </div> */}
      </div>
    </MyBottomSheet>
  );
};

export default EmergencyBottomSheet;
