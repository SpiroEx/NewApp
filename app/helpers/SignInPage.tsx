import VisibilityIcon from "@/components/svg/icon_animated/visibility/VisibilityIcon";
import Logo from "@/components/templates/Logo";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import SizedBox from "@/components/templates/SizedBox";
import Title from "@/components/templates/Title";
import useSignInPage, { SignInType } from "@/hooks/useSignIn";
import { useState } from "react";
import Txt from "@/components/templates/Txt";
import GoogleLogo from "@/components/svg/icon/GoogleLogo";
import { MotionDiv } from "@/types/framer_motion_types";

const SignInPage: React.FC = () => {
  const {
    type,
    toggleType,
    login,
    signup,
    forgotPassword,
    emailInput,
    passwordInput,
    isSigningIn,
    googleSignIn,
  } = useSignInPage();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div
        className="ccc-8 px-10 pb-12 bg-aspect-ratio"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/*//! HEADER */}
        <div className="mt-8" />
        <Logo />
        <Title />

        {/*//! FORM */}
        <form
          className="ccc-10 wf"
          onSubmit={type === SignInType.signUp ? signup : login}
        >
          <div className="wf">
            <MyInput
              placeholder="Email"
              inputField={emailInput}
              className="bg-transparent"
            />
          </div>
          <div className="relative wf max-w-sm">
            <MyInput
              placeholder="Password"
              className="bg-transparent pr-12"
              type={showPassword ? "text" : "password"}
              inputField={passwordInput}
            />
            <div className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2">
              <VisibilityIcon
                isOpen={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <MyButton
            type="submit"
            label={type === SignInType.signUp ? "SIGN UP" : "LOGIN"}
            disabled={isSigningIn}
          />
        </form>

        {/*//! FORGOT PASSWORD */}
        <div className="h-8 rse">
          {type == SignInType.logIn && (
            <p
              className={`text-xs text-link fit-content m-auto select-none cursor-pointer`}
              onClick={forgotPassword}
            >
              FORGOT PASSWORD&#63;
            </p>
          )}
        </div>

        {/*//! DONT HAVE AN ACCOUNT */}
        <div className="rcc">
          <p className={`text-text_gray fit-content m-0 text-xs`}>
            {type == SignInType.logIn
              ? "DON'T HAVE AN ACOUNT?"
              : "ALREADY HAVE AN ACCOUNT?"}
          </p>
          <SizedBox width={10} />
          <p
            onClick={toggleType}
            className={`text-link fit-content m-0 text-xs`}
          >
            {type == SignInType.logIn ? "CREATE ONE" : "LOGIN"}
          </p>
        </div>

        {/*//! GMAIL */}
        <div className="rcc wf">
          <Txt.p>or</Txt.p>
        </div>
        <MotionDiv
          className="w-min m-auto rsc-2 rounded-full bg-light_dark px-4 py-2"
          whileTap={{ scale: 0.85 }}
          onClick={googleSignIn}
        >
          <GoogleLogo />
          <Txt.p className="whitespace-nowrap">Sign in with Google</Txt.p>
        </MotionDiv>
      </div>
    </div>
  );
};

export default SignInPage;
