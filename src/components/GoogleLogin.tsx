import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const GoogleLogin = ({
  handleGoogleLogin,
}: {
  handleGoogleLogin: () => void;
}) => {
  const { error } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex-column">
      <div className="google-login" onClick={handleGoogleLogin}>
        <FcGoogle className="google-icon" />
        <button className="cursor-pointer">Continue with Google</button>
      </div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
};
