import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Test } from "./elements/Test";
import Timeline from "./elements/Timeline";
import HashtagTimeline from "./elements/HashtagTimeline";

import "../styles/reset.css";
import "../styles/style.css";

function App() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/publish" element={<Timeline/>} />
                <Route path="/hashtag/:hashtag" element={<HashtagTimeline />} />
                <Route path="/" element={<Test />} />
            </Routes>
            </BrowserRouter>
        </>
    )
}

export { App };