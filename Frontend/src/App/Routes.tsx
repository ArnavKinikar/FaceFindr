import { Routes, Route } from "react-router-dom";
import HomePage from "../Features/Home/HomePage";
import UploadPage from "../Features/Upload/UploadPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
        </Routes>
    );
}

export default AppRoutes;

