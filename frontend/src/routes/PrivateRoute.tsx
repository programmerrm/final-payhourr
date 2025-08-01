import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = useAuth();
    console.log('User authenticated:', isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}