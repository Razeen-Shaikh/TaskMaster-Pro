import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../firebase";
import { setUser } from "../redux/features/authSlice";

export const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
  };

  return (
    <button className="logout" onClick={handleLogout}>
      <TbLogout2 className="icon" />
      <span>Logout</span>
    </button>
  );
};
