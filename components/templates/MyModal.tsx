import Modal from "react-modal";
import { twMerge } from "tailwind-merge";

import type useModal from "@/hooks/useModal";

interface MyModalProps {
  useModal: ReturnType<typeof useModal>;
  title: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
  className?: string;
  classNameInner?: string;
  classNameContent?: string;
  hideLine?: boolean;
}

const MyModal: React.FC<MyModalProps> = ({
  useModal,
  title,
  children,
  height,
  width,
  className,
  classNameInner,
  classNameContent,
  hideLine = false,
}) => {
  return (
    <Modal
      isOpen={useModal.isOpen}
      ariaHideApp={false}
      className={twMerge(" inset-0 t-zinc-600", className)}
      onRequestClose={useModal.close}
      // style={customStyles}
    >
      {/* MAIN CONTENT */}
      <div
        className={twMerge(
          "absolute w-72 drop-shadow-lg shadow-lg bg-white rounded-xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
          classNameContent
        )}
      >
        <div className="rounded-t-xl bg-header_modal py-2">
          <p className="t-white t77c">{title}</p>
        </div>
        <div className="px-3 py-5">{children}</div>
      </div>
    </Modal>
  );
};

export default MyModal;
