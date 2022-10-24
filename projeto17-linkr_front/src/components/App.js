import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedSignIn from "../services/ProtectedSignIn";

import { Test } from "./elements/Test";
import Timeline from "./elements/Timeline";

import "../styles/reset.css";
import "../styles/style.css";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedSignIn />}>
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Route>
                    <Route path="/publish" element={<Timeline />} />
                    <Route path="/" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export { App };