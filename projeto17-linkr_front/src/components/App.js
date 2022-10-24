import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedSignIn from "../services/ProtectedSignIn";

import Timeline from "./elements/Timeline";
import HashtagTimeline from "./elements/HashtagTimeline";

import "../styles/reset.css";
import "../styles/style.css";
import SignUp from "./elements/SignUp";
import SignIn from "./elements/SignIn";



function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedSignIn />}>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Route>
                    <Route path="/publish" element={<Timeline />} />
                    <Route path="/hashtag/:hashtag" element={<HashtagTimeline />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export { App };