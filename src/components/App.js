import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedSignIn from "../services/ProtectedSignIn";

import Timeline from "./elements/Timeline";
import ProfileId from "./elements/profile";
import HashtagTimeline from "./elements/HashtagTimeline";

import "../styles/reset.css";
import "../styles/style.css";
import SignUp from "./elements/SignUp";
import SignIn from "./elements/SignIn";



function App() {
    let user = {
        image: "",
        name: ""
    }
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
                    <Route path="/profile/:id" element={<ProfileId user={user}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export { App };