import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const GoogleLogin =
    ({ handleGoogleLogin }: { handleGoogleLogin: () => void }) => {
        const { error } = useSelector((state: RootState) => state.auth);

        return (
            <div className="google-login" onClick={handleGoogleLogin}>
                <FcGoogle className="google-icon" />
                <button>Continue with Google</button>
                {error && <p>{error}</p>}
            </div>
        );
    };
