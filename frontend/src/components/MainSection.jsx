import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { delPost, postLikePost, postUnlikePost, postUserPost } from "../services/Requests";
import { showNotification } from "../store/notifications/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { fetchPosts } from "../services/fetchFunctions";

const MainSection = () => {
    const dispatch = useDispatch();
    const [tweetDescription, setTweetDescription] = useState("");
    const [progress, setProgress] = useState(false);

    const { posts } = useSelector((state) => state.service);

    useEffect(() => {
        fetchPosts(dispatch);
    }, []);

    const onTweetSubmit = async () => {
        try {
            setProgress(true);
            const response = await postUserPost({ description: tweetDescription });
            const result = await response.json();
            if (response.ok) {
                dispatch(
                    showNotification({
                        message: "Tweet Shared Successfully!",
                        type: "success",
                    })
                );
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
            fetchPosts(dispatch);
        } catch (error) {
            console.error(error);
            dispatch(
                showNotification({
                    message: "Something went wrong!",
                    type: "error",
                })
            );
        } finally {
            setProgress(false);
            setTweetDescription("");
        }
    };

    const timeFormatter = (time) => {
        return new Date(time).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const onLikePost = async (postId) => {
        try {
            const response = await postLikePost({ postId });
            const result = await response.json();
            if (response.ok) {
                dispatch(
                    showNotification({
                        message: "Post Liked Successfully!",
                        type: "success",
                    })
                );
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
            fetchPosts(dispatch);
        } catch (error) {
            console.error(error);
            dispatch(
                showNotification({
                    message: "Something went wrong!",
                    type: "error",
                })
            );
        }
    };

    const onUnLikePost = async (postId) => {
        try {
            const response = await postUnlikePost({ postId });
            const result = await response.json();
            if (response.ok) {
                dispatch(
                    showNotification({
                        message: "Post Unliked Successfully!",
                        type: "success",
                    })
                );
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
            fetchPosts(dispatch);
        } catch (error) {
            console.error(error);
            dispatch(
                showNotification({
                    message: "Something went wrong!",
                    type: "error",
                })
            );
        }
    };

    const delSinglePost = async (postId) => {
        try {
            const response = await delPost(postId);
            const result = await response.json();
            if (response.ok) {
                dispatch(
                    showNotification({
                        message: "Post Deleted Successfully!",
                        type: "success",
                    })
                );
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
            fetchPosts(dispatch);
        } catch (error) {
            console.error(error);
            dispatch(
                showNotification({
                    message: "Something went wrong!",
                    type: "error",
                })
            );
        }
    };

    return (
        <section
            style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(200, 200, 200, 0.5) transparent",
                WebkitScrollbarWidth: "thin",
                WebkitScrollbarColor: "rgba(0, 0, 0, 0.5) transparent",
            }}
        >
            <Card className="w-full">
                <Typography
                    variant="h6"
                    color="secondary"
                    sx={{ padding: "0.25rem 0.5rem", fontWeight: "bold" }}
                >
                    Home
                </Typography>
                <Divider />
                <CardContent>
                    <TextField
                        id="outlined-multiline-static"
                        color="secondary"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        placeholder="What's happening?"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Avatar
                                        alt="User Avatar"
                                        src="https://randomuser.me/api/portraits/men/1.jpg"
                                        sx={{ width: 48, height: 48, marginRight: 1 }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "none",
                                boxShadow: "none",
                                color: "#8E2947",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#8E2947",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#8E2947",
                            },
                        }}
                        onChange={(e) => setTweetDescription(e.target.value)}
                        value={tweetDescription}
                    />
                </CardContent>
                <CardActions className="flex justify-end">
                    <button
                        className="bg-[#8E2947] hover:bg-[#8b3850] text-white font-bold py-1 px-4 w-25 rounded-3xl "
                        onClick={onTweetSubmit}
                        disabled={progress}
                    >
                        {progress ? "Sending..." : "Send"}
                    </button>
                </CardActions>
            </Card>

            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    onLikePost={onLikePost}
                    onUnLikePost={onUnLikePost}
                    delSinglePost={delSinglePost}
                    timeFormatter={timeFormatter}
                />
            ))}
        </section>
    );
};

export default MainSection;
