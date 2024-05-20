import { Box, TextField, Typography, IconButton, Stack, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { hideModal } from "../store/modal/modalSlice";
import { patchPost, postUserPost } from "../services/Requests";
import { showNotification } from "../store/notifications/notificationSlice";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: `2px solid #8E2947`,
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    maxHeight: "90vh",
    overflowY: "auto",
    width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
};

const createNoteSchema = yup.object({
    title: yup.string().required("Tweet title is required*"),
    description: yup.string().required("Tweet description is required*"),
    url: yup
        .string()
        .notRequired()
        .test(
            "is-url-valid",
            "Invalid URL format",
            (value) =>
                !value ||
                /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?(\.(jpg|gif|png))?$/.test(value)
        ),
});

const TweetModal = () => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(false);
    const { type, updateShema } = useSelector((state) => state.modal);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createNoteSchema),
    });

    const onSubmit = async (data) => {
        try {
            setProgress(true);
            let response;
            if (updateShema) {
                response = await patchPost({ ...updateShema, ...data });
            } else {
                response = await postUserPost(data);
            }
            const result = await response.json();
            if (response.ok) {
                dispatch(
                    showNotification({
                        message: updateShema
                            ? "Tweet Updated Successfully!"
                            : "Tweet Shared Successfully!",
                        type: "success",
                    })
                );
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "info",
                    })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(
                showNotification({
                    message: "Something went wrong!",
                    type: "error",
                })
            );
        } finally {
            setProgress(false);
            dispatch(hideModal());
            reset();
        }
    };

    useEffect(() => {
        if (type === "TweetModal" && updateShema !== null) {
            reset({
                title: updateShema?.title,
                description: updateShema?.description,
                url: updateShema?.url,
            });
        }
    }, [type, updateShema, reset]);

    return (
        <Box>
            <Modal
                aria-labelledby="create-notes-modal-title"
                aria-describedby="create-notes-modal-description"
                open={type === "TweetModal"}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={type === "TweetModal"}>
                    <Box sx={modalStyle} width={"50%"}>
                        <Box className="flex justify-between items-center">
                            <Typography
                                id="create-notes-modal-title"
                                variant="h6"
                                component="h2"
                                color={"secondary"}
                            >
                                {updateShema ? "Tweet Güncelle" : "Tweet Ekle"}
                            </Typography>
                            <IconButton
                                aria-label="exit"
                                size="large"
                                onClick={() => dispatch(hideModal())}
                                color="error"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                            {progress ? <LinearProgress color="primary" /> : null}
                        </Stack>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1, width: "100%" }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box className="flex flex-col gap-4">
                                        <TextField
                                            margin="dense"
                                            size="small"
                                            color="secondary"
                                            fullWidth
                                            id="title"
                                            label="Tweet Başlığı"
                                            name="title"
                                            autoComplete="title"
                                            autoFocus
                                            {...register("title")}
                                            error={!!errors.title}
                                            helperText={errors?.title?.message}
                                        />
                                        <TextField
                                            margin="dense"
                                            size="small"
                                            color="secondary"
                                            fullWidth
                                            id="description"
                                            label="Tweet Açıklaması"
                                            name="description"
                                            autoComplete="description"
                                            multiline
                                            rows={4}
                                            {...register("description")}
                                            error={!!errors.description}
                                            helperText={errors?.description?.message}
                                        />
                                        <TextField
                                            margin="dense"
                                            size="small"
                                            color="secondary"
                                            fullWidth
                                            id="url"
                                            label="Tweet URL"
                                            name="url"
                                            autoComplete="url"
                                            {...register("url")}
                                            error={!!errors.url}
                                            helperText={errors?.url?.message}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <button
                                className="bg-[#8E2947] hover:bg-[#8b3850] text-white font-bold py-2 px-4  w-full rounded-3xl"
                                type="submit"
                                disabled={progress}
                            >
                                {progress
                                    ? updateShema
                                        ? "Updating..."
                                        : "Addition Process Continues..."
                                    : updateShema
                                    ? "Update Tweet"
                                    : "Add Tweet"}
                            </button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default TweetModal;
