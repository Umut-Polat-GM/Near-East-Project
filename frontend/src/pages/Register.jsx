import { Box, Button, Container, CssBaseline } from "@mui/material";
import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AccountCircle } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import HttpsIcon from "@mui/icons-material/Https";
import CircularProgress from "@mui/material/CircularProgress";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import logo from "../assets/images/images.jpeg";
import bgImage from "../assets/images/bgImage.jpg";
import { showNotification } from "../store/notifications/notificationSlice";
import { postUserRegister } from "../services/Requests";

// With yup library, we can define a schema for form validation.
const schema = yup.object({
    username: yup.string(),
    email: yup
        .string()
        .matches(/@std.neu.edu.tr$/, "Email must be @std.neu.edu.tr")
        .required("Email required*"),
    password: yup.string().required("Password required*"),
});

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        // console.log("data:", data);
        try {
            setProgress(true);
            const response = await postUserRegister(data);
            const result = await response.json();
            if (response.ok) {
                navigate("/login");
                dispatch(
                    showNotification({
                        type: "success",
                        message: `User ${result.user.username} registered successfully`,
                    })
                );
            } else {
                dispatch(showNotification({ type: "error", message: result.msg }));
            }
        } catch (Error) {
            dispatch(showNotification({ type: "error", message: "Someting wen wrong!" }));
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
                                id="username"
                                name="username"
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                color="secondary"
                                {...register("username")}
                                error={!!errors.username}
                                helperText={errors?.username?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon color="secondary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
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
                                        <HowToRegIcon />
                                    )
                                }
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}

Register.propTypes = {
    visible: propTypes.bool,
    setVisible: propTypes.func,
};
