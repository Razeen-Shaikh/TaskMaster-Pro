import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase-config";
import { GoogleLogin, TaskBuddy } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError } from "../redux/features/authSlice";
import { RootState } from "../redux/store";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        try {
            const loggedInUser = await signInWithGoogle();
            if (loggedInUser) {
                dispatch(setUser(loggedInUser));
                dispatch(setError(null));
                navigate("/tasks");
            } else {
                dispatch(setError("Failed to log in with Google."));
            }
        } catch {
            dispatch(setError("Failed to log in with Google."));
        }
    };

    return (
        <div className="row justify-center align-center">
            <div className="row justify-center align-center">
                <div className="home-card">
                    <TaskBuddy className="home-title" />
                    <p>Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                    <GoogleLogin handleGoogleLogin={handleGoogleLogin} />
                </div>
            </div>

            <div className="home-image">
                <img src="https://s3-alpha-sig.figma.com/img/494f/1405/d39d91697e2b4152019135fa206392a5?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MTr6oCY74LxUeOyckfJcsILsM~lKx9IILziQw9E8jedx7mdj4ehc5oQ~W6QButJYG7k43w3vBdLtuX9fR7uqciIRx5Ei9KorPubrdrXznqOZ8Lsdo-NovVmVy5Ewrq77SPrgO0t24jlK4RXUD9Uqv~pHoXho3kLlJz97osq2ITYKLouPsRMncbT2-5AStOEKWK~LrYrO0IUiz2qIc9ttNBGH82zqEFgz-e~DxlKaocChMaGatxULqQ1Zmsdz6zTApE7I85EqteNiAbm62A0fGdJsaTquD5~WMHe0f6ZBaTuyj9emuEy2vplIOB0D2DSrv5V56usI-JnurJz0f4cDOw__" alt="Task Manager" />
            </div>
        </div>
    )
}

export default Home;