import type { User } from "firebase/auth";
import type { FormEventHandler, MouseEventHandler } from "react";

import { Config } from "@/classes/Constants";
import FH from "@/classes/FH";
import { Role, type Gender, type MyUser } from "@/classes/MyUser";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import Title from "@/components/templates/Title";
import { useCheckboxField, useInputField } from "@/hooks/useInputField";
import { useS } from "@/hooks/useReactHooks";
import notify from "@/myfunctions/notify";
import MyDatePicker from "@/components/templates/MyDatePicker";
import MyDropDownPicker from "@/components/templates/MyDropdownPicker";
import { Timestamp } from "firebase/firestore";

interface RegisterPageProps {
  user: User;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ user }) => {
  const [selectedImage, setSelectedImage] = useS<File | null>(null);
  const [creatingMyUser, setCreatingMyUser] = useS(false);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your full name"],
  ]);

  const [birthDate, setBirthDate] = useS<Date>(new Date(2003, 0, 1));
  const [gender, setGender] = useS<Gender>("Male");
  const [role, setRole] = useS<Role>("Patient");

  const heightInput = useInputField((height) => [
    [!height, "Please Enter your height"],
    [isNaN(Number(height)), "Please Enter a valid height"],
    [Number(height) < 0 || Number(height) > 300, "Please Enter a valid height"],
  ]);

  const termsInput = useCheckboxField(
    "Please agree to the terms and conditions"
  );

  //! REGISTER
  const register: MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.log("REGISTERING");

    if (!nameInput.verify() || !heightInput.verify()) return;
    if (birthDate >= new Date()) {
      notify("Please enter a valid birth date");
      return;
    }

    if (Config.hasTermsAndConditions && !termsInput.verify()) return;

    setCreatingMyUser(true);
    try {
      //! Save image in storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FH.MyUser.Picture.create(user.uid, selectedImage);
        const photoUrlFromFirebase = await FH.MyUser.Picture.get(user.uid);

        if (!photoUrlFromFirebase) {
          console.log("Error getting photo url from firebase");
          notify("An error occured getting photo url from firebase");
          return;
        }

        photoURL = photoUrlFromFirebase;
      }

      const myUser: MyUser = {
        id: user.uid,
        name: nameInput.getValue()!,
        photoURL,
        email: user.email!,
        birthdate: Timestamp.fromDate(birthDate),
        gender,
        role,
        height: Number(heightInput.getValue()!),
      };

      //! Create MyUser
      await FH.MyUser.create(myUser);
    } catch (error) {
      console.log(error);
      notify("An error occured while registering");
    }
    setCreatingMyUser(false);
  };

  return (
    <div className="px-10">
      {/* <img src={user.photoURL ?? undefined} alt="dsads" /> */}
      {/* //! TITLE */}
      <div className="h-28" />
      <Title />
      <h1 className="mb-10 mt-2 tc">Tell us about you..</h1>
      {/* <SizedBox height={80} /> */}

      {/* //! AVATAR */}
      <EditableAvatar
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        size={120}
      />
      <form className="mb-10 csc-10" onSubmit={(e) => e.preventDefault()}>
        {/* //! FULL NAME */}
        <MyInput
          placeholder="Full name"
          className="bg-transparent"
          inputField={nameInput}
        />

        {/* //! ROLE */}
        <MyDropDownPicker
          className="!w-60 m-auto"
          darkMode
          options={[
            { label: "Patient", value: "Patient" },
            { label: "Doctor", value: "Doctor" },
          ]}
          value={role}
          setValue={(v) => setRole((v as Role) ?? "Patient")}
        />

        {/* //! BIRTH DATE */}
        <div className="css-1">
          <p className="t33 o-50">Birth Date</p>
          <MyDatePicker
            className="!w-60"
            date={birthDate}
            setDate={setBirthDate}
          />
        </div>

        {/* //! GENDER */}
        <MyDropDownPicker
          className="!w-60 m-auto"
          darkMode
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          value={gender}
          setValue={(v) => setGender((v as Gender) ?? "Male")}
        />

        {/* //! HEIGHT */}
        <MyInput
          placeholder="Height (cm)"
          className="bg-transparent"
          type="number"
          inputField={heightInput}
        />

        {/* //! TERMS AND CONDITIONS */}
        {Config.hasTermsAndConditions && (
          <TermsAndConditions termsInput={termsInput} />
        )}

        {/* //! SUBMIT BUTTON */}
        <MyButton
          type="button"
          label="Create Account"
          disabled={creatingMyUser}
          onClick={register}
        />
      </form>
    </div>
  );
};

export default RegisterPage;

interface TermsAndConditionsProps {
  termsInput: ReturnType<typeof useCheckboxField>;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  termsInput,
}) => {
  return (
    <div className="flex items-center gap-2 text-sm justify-center">
      <input ref={termsInput.ref} type="checkbox" name="terms" />
      <p
        className="opacity-50 cp"
        onClick={() => {
          termsInput.ref.current?.click();
        }}
      >
        I agree to the{" "}
      </p>
      <p className="font-semibold">
        <a target="_blank" href={Config.termsLink}>
          Terms & Conditions
        </a>
      </p>
    </div>
  );
};
