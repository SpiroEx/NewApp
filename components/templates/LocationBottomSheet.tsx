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
      <div className="flex justify-between items-center px-5 pb-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-zinc-700 font-semibold">{title}</p>
          <p className="text-xs text-zinc-500">{address}</p>
        </div>
        <PinIcon />
      </div>
    </MyBottomSheet>
  );
};

export default LocationBottomSheet;
