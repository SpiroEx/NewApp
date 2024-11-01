import { Config } from "@/classes/Constants";
import EmailLogo from "@/components/svg/EmailLogo";
import MyButton from "@/components/templates/MyButton";
import { us } from "@/hooks/useReactHooks";
import signOutClick from "@/myfunctions/signOutClick";
import { sendEmailVerification, User } from "firebase/auth";

interface EmailVerificationPageProps {
  user: User;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({
  user,
}) => {
  const [resent, setResent] = us(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(user.emailVerified);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [user.emailVerified]);

  return (
    <div className="bg-gray-900 w-screen h-screen text-white flex flex-col items-center gap-8 pt-20">
      <div className="flex flex-col items-center gap-2 opacity-50">
        <EmailLogo size={109} />
        <p className="font-light text-sm">{user.email}</p>
      </div>

      <p className="text-xl">Please verify your email address to continue</p>

      {/*//! RESEND VERIFICATION */}
      {resent ? (
        <p>Email sent!</p>
      ) : (
        <MyButton
          className="w-min bg-emerald-400 m-0"
          label="Resend Verification Email"
          onClick={() => {
            sendEmailVerification(user, {
              url: Config.hostingWebsite,
            });
            setResent(true);
          }}
        />
      )}

      {/*//! SIGN OUT */}
      <MyButton
        className="w-min bg-red-400 m-0"
        label="Sign Out"
        onClick={signOutClick}
      />
    </div>
  );
};

export default EmailVerificationPage;
