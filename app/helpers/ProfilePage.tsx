import FH from "@/classes/FH";
import { Gender, MyUser } from "@/classes/MyUser";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import BackAndroidIcon from "@/components/svg/icon/BackAndroidIcon";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import MyModal from "@/components/templates/MyModal";
import { useInputField } from "@/hooks/useInputField";
import useModal from "@/hooks/useModal";
import { useC, useS } from "@/hooks/useReactHooks";
import notify from "@/myfunctions/notify";
import { signOut } from "firebase/auth";
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { FHContext } from "../templates/FH_Wrapper";
import { TailwindContext } from "../templates/Tailwind_Wrapper";
import PageContainer from "@/components/templates/PageContainer";
import MyDatePicker from "@/components/templates/MyDatePicker";
import MyDropDownPicker from "@/components/templates/MyDropdownPicker";
import { Timestamp } from "firebase/firestore";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { myUser } = useC(FHContext);
  const { setPage } = useC(PageWrapperContext);
  const { getColor } = useC(TailwindContext);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedID, setSelectedID] = useS<File | null>(null);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your name"],
  ]);

  const [birthDate, setBirthDate] = useS<Date>(new Date(2003, 0, 1));
  const [gender, setGender] = useS<Gender>("Male");

  const heightInput = useInputField((height) => [
    [!height, "Please Enter your height"],
    [isNaN(Number(height)), "Please Enter a valid height"],
    [Number(height) < 0 || Number(height) > 300, "Please Enter a valid height"],
  ]);

  const [photoURLUpdated, setPhotoURLUpdated] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);
  const [birthDateUpdated, setBirthDateUpdated] = useState(false);
  const [genderUpdated, setGenderUpdated] = useState(false);
  const [heightUpdated, setHeightUpdated] = useState(false);
  const [updatingMyUser, setUpdatingMyUser] = useState(false);

  const signOutModal = useModal();

  const hasUpdates =
    photoURLUpdated ||
    nameUpdated ||
    heightUpdated ||
    genderUpdated ||
    birthDateUpdated;

  //! INITIALIZE FIELDS
  useEffect(() => {
    if (!myUser) return;
    nameInput.setValue(myUser.name);
    setBirthDate(myUser.birthdate.toDate());
    setGender(myUser.gender);
    heightInput.setValue(myUser.height.toString());
  }, [myUser]);

  //! REGISTER
  const updateMyUser: MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!myUser) return;
    if (!nameInput.verify()) return;
    if (birthDate >= new Date()) {
      notify("Please enter a valid birth date");
      return;
    }
    if (!heightInput.verify()) return;

    setUpdatingMyUser(true);
    try {
      //! Save image in firebase storage if there is one
      let photoURL: string | undefined = "";

      if (selectedImage) {
        await FH.MyUser.Picture.create(myUser.id, selectedImage);
        photoURL = await FH.MyUser.Picture.get(myUser.id);
      }

      const myUserUpdates: Partial<MyUser> = {};

      if (photoURLUpdated) {
        myUserUpdates.photoURL = photoURL;
      }
      if (nameUpdated) {
        myUserUpdates.name = nameInput.getValue()!;
      }

      if (birthDateUpdated) {
        myUserUpdates.birthdate = Timestamp.fromDate(birthDate);
      }

      if (genderUpdated) {
        myUserUpdates.gender = gender;
      }

      if (heightUpdated) {
        myUserUpdates.height = Number(heightInput.getValue()!);
      }

      await FH.MyUser.update(myUser, myUserUpdates);
      notify("Profile updated", { type: "success" });
      setPhotoURLUpdated(false);
      setNameUpdated(false);
      setBirthDateUpdated(false);
      setGenderUpdated(false);
      setHeightUpdated(false);
    } catch (error) {
      console.log(error);
      notify("An error occured while updating");
    }
    setUpdatingMyUser(false);
  };

  return (
    <PageContainer>
      <div className="min-hs flex flex-col items-center t-text csc-15">
        {/*//! PROFILE PIC */}
        <div className="pt-5">
          <EditableAvatar
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            photoURL={myUser?.photoURL}
            onChooseImage={() => setPhotoURLUpdated(true)}
            size={120}
            withBackground
            bgClassName="bg-blue-300"
          />
        </div>
        <form
          className="csc-10 wf px-10 mb-10"
          onSubmit={(e) => e.preventDefault()}
        >
          {/*//! NAME */}
          <div className="css-1 wf">
            <p className="t43 o-50">Name</p>
            <MyInput
              placeholder="Name"
              className="bg-transparent wf"
              divClassName="wf"
              inputField={nameInput}
              maxLength={30}
              onChange={() => setNameUpdated(true)}
            />
          </div>

          {/* //! BIRTH DATE */}
          <div className="css-1">
            <p className="t43 o-50">Birth Date</p>
            <MyDatePicker
              className="!w-60"
              date={birthDate}
              setDate={(d) => {
                setBirthDate(d);
                setBirthDateUpdated(true);
              }}
            />
          </div>

          {/* //! GENDER */}
          <div className="css-1">
            <p className="t43 o-50">Gender</p>
            <MyDropDownPicker
              className="!w-60 m-auto"
              darkMode
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              value={gender}
              setValue={(v) => {
                setGender((v as Gender) ?? "Male");
                setGenderUpdated(true);
              }}
            />
          </div>

          {/* //! HEIGHT */}
          <div className="css-1">
            <p className="t43 o-50">Height (cm)</p>
            <MyInput
              placeholder="Height (cm)"
              className="bg-transparent"
              type="number"
              inputField={heightInput}
              onChange={() => setHeightUpdated(true)}
            />
          </div>

          {/*//! SUBMIT - BUTTON */}
          <MyButton
            type="button"
            label="Update"
            onClick={updateMyUser}
            disabled={!hasUpdates || updatingMyUser}
          />
        </form>

        {/*//! SIGN OUT - BUTTON */}
        <div className="px-10 mt-20">
          <MyButton
            type="button"
            label="Sign Out"
            outlined
            className="rounded-full bg-red"
            classNameText=""
            disabled={updatingMyUser}
            onClick={signOutModal.open}
          />
        </div>

        {/*//! SIGN OUT - MODAL */}
        <MyModal
          useModal={signOutModal}
          title="Sign Out"
          classNameContent="bg-gray"
        >
          <div className="csc-5 bg-gray t-white">
            <p className="t42c o-70">Are you sure you want to sign out?</p>
            <div className="flex gap-5">
              <MyButton
                type="button"
                label="Cancel"
                outlined
                className="rounded-full"
                pY={0.2}
                onClick={signOutModal.close}
              />
              <MyButton
                type="button"
                label="Sign Out"
                className="rounded-full bg-red-600"
                classNameText="text-white"
                pY={0.2}
                onClick={() => signOut(auth)}
              />
            </div>
          </div>
        </MyModal>

        <WebsiteVersion />
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
