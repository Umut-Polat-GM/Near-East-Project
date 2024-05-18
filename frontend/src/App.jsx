import { Box } from "@mui/material";
import Login from "./pages/Login";
import Notifications from "./components/Notifications";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const App = () => {
    const userInfo = useSelector((state) => state.user.user);
    // console.log("userInfo", userInfo);
    return (
        <Box className="bg-white min-h-screen text-black">
            <Notifications />
            <Routes>
                <Route path="/" element={userInfo ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
            </Routes>
        </Box>
    );
};

export default App;
