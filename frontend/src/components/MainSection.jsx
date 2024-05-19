import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublishIcon from "@mui/icons-material/Publish";
import { useEffect, useState } from "react";
import {
    checkFavoritePost,
    getUserPosts,
    postLikePost,
    postUnlikePost,
    postUserPost,
} from "../services/Requests";
import { showNotification } from "../store/notifications/notificationSlice";
import { useDispatch } from "react-redux";

const MainSection = () => {
    const dispatch = useDispatch();
    const [tweetDescription, setTweetDescription] = useState();
    const [posts, setPosts] = useState([]);
    const [progress, setProgress] = useState(false);

    const getAllPosts = async () => {
        try {
            const response = await getUserPosts();
            const result = await response.json();
            // console.log("response", response);
            // console.log("result", result);
            if (response.ok) {
                setPosts(result.posts);
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const onTweetSubmit = async () => {
        try {
            setProgress(true);
            const response = await postUserPost({ description: tweetDescription });
            const result = await response.json();
            // console.log("response", response);
            // console.log("result", result);
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
            getAllPosts();
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

    const isPostFavorite = async (postId) => {
        // Check if post is favorite
        try {
            const response = await checkFavoritePost(postId);
            const result = await response.json();
            // console.log("response", response);
            console.log("result", result.hasLiked);
            if (response.ok) {
                return result.hasLiked;
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onLikePost = async (postId) => {
        console.log("postId", postId);
        try {
            const response = await postLikePost({ postId });
            const result = await response.json();
            console.log("response", response);
            console.log("result", result);
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
            getAllPosts();
        } catch (error) {
            console.log(error);
            dispatch(
                showNotification({
                    message: "Something went wrong!",
                    type: "error",
                })
            );
        }
    };

    const onUnLikePost = async (postId) => {
        // Unlike post
        try {
            const response = await postUnlikePost({ postId });
            const result = await response.json();
            // console.log("response", response);
            // console.log("result", result);
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
            getAllPosts();
        } catch (error) {
            console.log(error);
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
                maxHeight: "calc(100vh - 100px)", // İsteğe bağlı: Popper'ın yüksekliği ayarlamak için kullanılabilir
                scrollbarWidth: "thin", // Firefox için scrollbar kalınlığını ayarlamak
                scrollbarColor: "rgba(200, 200, 200, 0.5) transparent", // Firefox için scrollbar rengini ayarlamak
                WebkitScrollbarWidth: "thin", // WebKit tarayıcıları için scrollbar kalınlığını ayarlamak
                WebkitScrollbarColor: "rgba(0, 0, 0, 0.5) transparent", // WebKit tarayıcıları için scrollbar rengini ayarlamak
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
                        onChange={(e) => {
                            setTweetDescription(e.target.value);
                        }}
                        value={tweetDescription}
                    />
                </CardContent>
                <CardActions className="flex justify-end">
                    <button
                        className="bg-[#8E2947] hover:bg-[#8b3850] text-white font-bold py-1 px-4 w-25 rounded-3xl "
                        onClick={() => onTweetSubmit()}
                        disabled={progress}
                    >
                        {progress ? "Sending..." : "Send"}
                    </button>
                </CardActions>
            </Card>

            {posts?.map((post) => (
                <Card key={post._id}>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt="User Avatar"
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                sx={{ width: 48, height: 48, marginRight: 1 }}
                            />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={post?.title}
                        subheader={post.createdAt && timeFormatter(post.createdAt)}
                    />
                    {post?.url && (
                        <CardMedia
                            component="img"
                            image={post.url}
                            alt="Paella dish"
                            sx={{
                                height: 240,
                                objectFit: "cover",
                                borderRadius: "0.5rem",
                            }}
                        />
                    )}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className="flex justify-between items-center">
                        {isPostFavorite(post._id) ? (
                            <Tooltip title="Remove from favorites">
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() => onUnLikePost(post._id)}
                                >
                                    <FavoriteIcon color="secondary" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Add to favorites">
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() => onLikePost(post._id)}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Share">
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Retweet">
                            <IconButton aria-label="retweet">
                                <PublishIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            ))}
        </section>
    );
};

export default MainSection;
