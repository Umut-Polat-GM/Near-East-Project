import { Box } from "@mui/material";
import Login from "./pages/Login";
import Notifications from "./components/Notifications";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import { ThemeProvider, createTheme } from "@mui/material";
import Profile from "./pages/Profile";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#8E2947",
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8E2947",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#8E2947",
                    },
                },
            },
        },
    },
});

const App = () => {
    const userInfo = useSelector((state) => state.user.user);
    // console.log("userInfo", userInfo);
    return (
        <ThemeProvider theme={theme}>
            <Box className="bg-white min-h-screen">
                <Notifications />
                <Routes>
                    <Route path="/" element={userInfo ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={userInfo ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
