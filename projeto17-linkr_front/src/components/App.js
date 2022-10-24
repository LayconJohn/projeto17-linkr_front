import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Test } from "./elements/Test";
import Timeline from "./elements/Timeline";
import ProfileId from "./elements/profile";

import "../styles/reset.css";
import "../styles/style.css";

function App() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/publish" element={<Timeline/>} />
                <Route path="/" element={<Test />} />
                <Route path="/profile/:id" element={<ProfileId />} />
            </Routes>
            </BrowserRouter>
        </>
    )
}

export { App };