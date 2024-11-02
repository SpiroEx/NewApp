import { useAddress } from "@/hooks/useAddress";
import MyBottomSheet from "../templates/MyBottomSheet";
import PinIcon from "../svg/icon/PinIcon";

interface LocationBottomSheetProps {
  open: boolean;
  lat?: number;
  lng?: number;
  title?: string;
  onClose?: () => void;
}

const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({
  open,
  lat,
  lng,
  title,
  onClose,
}) => {
  const address = useAddress(lat, lng);

  return (
    <MyBottomSheet open={open} onClose={onClose}>
      <div className="rbc px-5 pb-5">
        <div className="css-1">
          <p className="t36 t-zinc-700">{title}</p>
          <p className="t2 t-zinc-500">{address}</p>
        </div>
        <PinIcon />
      </div>
    </MyBottomSheet>
  );
};

export default LocationBottomSheet;
