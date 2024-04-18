import { useEffect, useState } from "react";

interface OverlayProps {
  children: React.ReactNode;
  setOverlay: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

let clickableTimeout: NodeJS.Timeout;

const Overlay: React.FC<OverlayProps> = ({ children, setOverlay }) => {
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    console.log("Overlay mounted");
    clickableTimeout = setTimeout(() => {
      setClickable(true);
    }, 500);

    return () => {
      clearTimeout(clickableTimeout);
    };
  }, []);
  return (
    <div className="fixed z-20 top-0 left-0 h-screen w-screen  flex m-auto px-10">
      <div className="m-auto">{children}</div>
      <div
        className="fixed -z-10 top-0 left-0 h-screen w-screen bg-black opacity-50"
        onClick={() => {
          if (!clickable) return;
          console.log("overlay clidked");
          setOverlay(null);
        }}
      />
    </div>
  );
};

export default Overlay;
