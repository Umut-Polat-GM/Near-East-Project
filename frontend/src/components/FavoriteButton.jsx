import { Tooltip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { checkFavoritePost, postLikePost, postUnlikePost } from "../services/Requests";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/notifications/notificationSlice";

const FavoriteButton = ({ post }) => {
    const dispatch = useDispatch();

    const isPostFavorite = async (postId) => {
        // Check if post is favorite
        try {
            const response = await checkFavoritePost({postId});
            const result = await response.json();
            // console.log("response", response);
            // console.log("result", result.hasLiked);
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
            const response = await postLikePost({postId: postId});
            const result = await response.json();
            // console.log("response", response);
            // console.log("result", result);
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
            const response = await postUnlikePost({postId: postId});
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

    const isFavorite = isPostFavorite(post._id);

    const handleClick = () => {
        console.log("isFavorite", isFavorite)
        if (isFavorite) {
            onUnLikePost(post._id);
        } else {
            onLikePost(post._id);
        }
    };

    return (
        <Tooltip title={isFavorite ? "Add Favorites" : "Remove Favorites"}>
            <IconButton aria-label="add to favorites" onClick={handleClick}>
                <FavoriteIcon color={isFavorite === true ? "secondary" : "default"} />
            </IconButton>
        </Tooltip>
    );
};

export default FavoriteButton;

FavoriteButton.propTypes = {
    post: PropTypes.object.isRequired,
};
