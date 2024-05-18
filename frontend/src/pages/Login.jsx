import { Box, Button, Checkbox, Container, CssBaseline } from "@mui/material";
import { FormControlLabel, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AccountCircle } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Lottie from "lottie-react";
// import animationData from "../assets/json/LottieLogin.json";
// import { theme } from "../theme";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import logo from "../assets/images/images.jpeg";
import bgImage from "../assets/images/bgImage.jpg";
import { showNotification } from "../store/notifications/notificationSlice";
import { login } from "../store/user/userSlice";
import Cookies from "js-cookie";
import { postUserLogin } from "../services/Requests";

// With yup library, we can define a schema for form validation.
const schema = yup.object({
    email: yup.string().email(""),
    password: yup.string().required("Şifre gerekli*"),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false);
    const [isRemember, setIsRemember] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: Cookies.get("email") || "",
            password: Cookies.get("password") || "",
        },
    });

    const onSubmit = async (data) => {
        // console.log("data:", data);
        try {
            setProgress(true);
            const response = await postUserLogin(data);
            // console.log("response", response);
            if (response) {
                dispatch(login(response.user));
                localStorage.setItem("token", response.token);
                sessionStorage.setItem("isPageOpened", "true");
                setProgress(false);
                navigate("/");
                if (isRemember) {
                    Cookies.set("email", data.email, { expires: 7 });
                    Cookies.set("password", data.password, { expires: 7 });
                } else {
                    Cookies.remove("email");
                    Cookies.remove("password");
                }
                dispatch(showNotification({ type: "success", message: `${response.msg}` }));
            } else {
                dispatch(showNotification({ type: "error", message: "User " }));
            }
        } catch (Error) {
            console.error("error:", Error.message);
            // dispatch(showNotification({ type: "error", message: Error.message }));
        } finally {
            setProgress(false);
        }
    };

    const EndAdorment = ({ visible, setVisible }) => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible(!visible)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {visible ? <VisibilityIcon color="secondary" /> : <VisibilityOffIcon />}
                </IconButton>
            </InputAdornment>
        );
    };

    return (
        <Grid container height={"100vh"}>
            <Grid
                item
                md={8}
                sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url(${bgImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></Grid>
            <Grid
                item
                xs={12}
                md={4}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: "160px", height: "160px", marginBottom: "1rem" }}
                        />
                        {/* <Lottie
                            animationData={animationData}
                            style={{ width: "160px", height: "160px" }}
                            aria-labelledby="use lottie animation"
                            loop={false}
                            autoplay={true}
                        /> */}
                        {/* <Typography
                            component="h1"
                            variant="h5"
                            sx={{
                                color: `${theme.palette.secondary.light}`,
                                fontWeight: "bold",
                            }}
                        >
                            Giriş
                        </Typography> */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                color="secondary"
                                placeholder="xxx@std.neu.edu.tr"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle color="secondary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                                id="password"
                                name="password"
                                label="Password"
                                type={visible ? "text" : "password"}
                                autoComplete="current-password"
                                color="secondary"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors?.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <EndAdorment visible={visible} setVisible={setVisible} />
                                    ),
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HttpsIcon color="secondary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "98%",
                                    margin: "0 auto",
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isRemember}
                                            onChange={(e) => setIsRemember(e.target.checked)}
                                            color="secondary"
                                            size="small"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <NavLink to="/register">Register</NavLink>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2, textTransform: "none" }}
                                color="secondary"
                                startIcon={
                                    progress ? (
                                        <CircularProgress color="inherit" size={"16px"} />
                                    ) : (
                                        <LoginIcon />
                                    )
                                }
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}

Login.propTypes = {
    visible: propTypes.bool,
    setVisible: propTypes.func,
};
