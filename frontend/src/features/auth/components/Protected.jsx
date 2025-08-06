import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate, useLocation } from "react-router-dom"

export const Protected = ({ children, adminOnly = false }) => {
    const loggedInUser = useSelector(selectLoggedInUser)
    const location = useLocation()

    // If user is not logged in, redirect to login with return URL
    if (!loggedInUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // If user is not verified, redirect to OTP verification
    if (!loggedInUser.isVerified) {
        return <Navigate to="/verify-otp" state={{ from: location }} replace />
    }

    // If route requires admin but user is not admin, redirect to home
    if (adminOnly && !loggedInUser.isAdmin) {
        return <Navigate to="/" replace />
    }

    // If all checks pass, render the protected content
    return children
}
