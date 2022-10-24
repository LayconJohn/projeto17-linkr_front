import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedSignIn from "../services/ProtectedSignIn";

import { Test } from "./elements/Test";
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
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Route>
                    <Route path="/publish" element={<Timeline />} />
                    <Route path="/hashtag/:hashtag" element={<HashtagTimeline />} />
                    <Route path="/" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export { App };