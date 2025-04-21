import { FHContext } from "@/app/templates/FH_Wrapper";
import { getIdealFev1, getIdealFvc, getIdealPef } from "@/classes/MyUser";
import { useC } from "@/hooks/useReactHooks";

interface IdealParamProps {}

const IdealParam: React.FC<IdealParamProps> = ({}) => {
  const { myUser } = useC(FHContext);
  const idealPef = getIdealPef(myUser);
  const idealFev1 = getIdealFev1(myUser);
  const idealFvc = getIdealFvc(myUser);

  return (
    <div className="css-4 mt-4 w-60">
      <p className="t46">Ideal Parameters</p>

      <div className="grid grid-cols-1 gap-3 px-2 w-80">
        {[
          ["PEF", idealPef.toFixed(2)],
          ["FEV1", idealFev1.toFixed(2)],
          ["FVC", idealFvc.toFixed(2)],
        ]?.map(([abbr, full], i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
            <p className="t26">{abbr}:</p>
            <p className="t22">{full}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdealParam;
