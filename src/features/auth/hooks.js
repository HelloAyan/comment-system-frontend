import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout } from "./authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, loading, error } = useSelector((state) => state.auth);

    const login = (email, password) => dispatch(loginUser({ email, password }));
    const register = (name, email, password) => dispatch(registerUser({ name, email, password }));
    const logoutUser = () => dispatch(logout());

    return { user, token, loading, error, login, register, logoutUser };
};
