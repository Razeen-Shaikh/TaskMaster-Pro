import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuthState } from "../firebase-config";
import { User } from "firebase/auth";

const PrivateRoute = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthState((currentUser: User | null) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    if (loading) return <h2>Loading...</h2>;

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

