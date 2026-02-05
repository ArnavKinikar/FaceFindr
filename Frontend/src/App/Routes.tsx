import { Routes, Route } from "react-router-dom";
import HomePage from "../Features/Home/HomePage";
import UploadPage from "../Features/Upload/UploadPage";
import GalleryPage from "../Features/Gallery/GalleryPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
    );
}

export default AppRoutes;

