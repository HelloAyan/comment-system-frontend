import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth";

export default function PublicRoute({ children }) {
    return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
}
