import { Config } from "@/classes/Constants";
import EmailIcon from "@/components/svg/icon/EmailIcon";
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
    <div className="csc-8 bg-gray-900 ws hs t-white pt-20">
      <div className="csc-2 opacity-50">
        <EmailIcon size={109} />
        <p className="t33">{user.email}</p>
      </div>

      <p className="t6">Please verify your email address to continue</p>

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
