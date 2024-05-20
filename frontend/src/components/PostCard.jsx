import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublishIcon from "@mui/icons-material/Publish";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useFavoriteStatus from "../hooks/useFavoriteStatus";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../store/modal/modalSlice";

const PostCard = ({ post, onLikePost, onUnLikePost, delSinglePost, timeFormatter }) => {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useFavoriteStatus(post._id);

    const handleFavoriteClick = async () => {
        if (isFavorite) {
            await onUnLikePost(post._id);
        } else {
            await onLikePost(post._id);
        }
        setIsFavorite(!isFavorite);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "multi-popover" : undefined;

    return (
        <Box>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar
                            alt="User Avatar"
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            sx={{ width: 48, height: 48, marginRight: 1 }}
                        />
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
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
                    <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                            <FavoriteIcon color={isFavorite ? "secondary" : "default"} />
                        </IconButton>
                    </Tooltip>
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    "& .MuiPopover-paper": {
                        width: "160px",
                        borderRadius: "1rem",
                        fontWeight: "bold",
                    },
                }}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                dispatch(showModal({ type: "TweetModal", updateShema: post }));
                                handleClose();
                            }}
                        >
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Edit"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => delSinglePost(post._id)}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Delete"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </Box>
    );
};

export default PostCard;

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    onLikePost: PropTypes.func.isRequired,
    onUnLikePost: PropTypes.func.isRequired,
    delSinglePost: PropTypes.func.isRequired,
    timeFormatter: PropTypes.func.isRequired,
};
