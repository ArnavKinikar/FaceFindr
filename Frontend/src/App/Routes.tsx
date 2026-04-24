import { Routes, Route } from "react-router-dom";
import HomePage from "../Features/Home/HomePage";
import LoginPage from "../Features/Auth/LoginPage";
import SignupPage from "../Features/Auth/SignupPage";
import AdminDashboard from "../Features/Admin/Dashboard/AdminDashboard";
import AlbumsPage from "../Features/Admin/Albums/AlbumsPage";
import ProfilePage from "../Features/Admin/Profile/ProfilePage";
import SettingsPage from "../Features/Admin/Settings/SettingsPage";
import BulkUploadPage from "../Features/Admin/Upload/BulkUploadPage";
import AlbumLandingPage from "../Features/Public/Landing/AlbumLandingPage";
import UploadFacePage from "../Features/Public/UploadFace/UploadFacePage";
import UploadPhotosPage from "../Features/Public/UploadPhotos/UploadPhotosPage";
import UploadConfirmation from "../Features/Public/UploadPhotos/UploadConfirmation";
import PublicGalleryPage from "../Features/Public/Gallery/PublicGalleryPage";

function AppRoutes() {
    return (

        <Routes>
            {/* Common / Admin Home */}
            <Route path="/" element={<HomePage />} />
            
            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />

            {/* Admin Flow */}
            <Route path="/admin/albums" element={<AlbumsPage />} />
            <Route path="/admin/dashboard/:albumId" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
            <Route path="/admin/settings/:albumId" element={<SettingsPage />} />
            <Route path="/admin/upload" element={<BulkUploadPage />} />

            {/* Guest Flow */}
            <Route path="/album" element={<AlbumLandingPage />} />
            <Route path="/upload-face" element={<UploadFacePage />} />
            <Route path="/public/upload" element={<UploadPhotosPage />} />
            <Route path="/public/upload/confirmation" element={<UploadConfirmation />} />
            <Route path="/public/gallery" element={<PublicGalleryPage />} />
        </Routes>
    );
}

export default AppRoutes;

