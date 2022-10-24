import { Navigate, Outlet } from "react-router-dom"



const Auth = () => {
    const authenticator = JSON.parse(localStorage.getItem('my-wallet'));
    return authenticator
}

const ProtectedSignIn = () => {
    const isAuth = Auth()

    if (isAuth) {
        return <Navigate to="/" replace />

    } else {
        return <Outlet />
    }

}

export default ProtectedSignIn;