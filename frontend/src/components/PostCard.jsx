import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublishIcon from "@mui/icons-material/Publish";
import useFavoriteStatus from "../hooks/useFavoriteStatus";
import PropTypes from "prop-types";

const PostCard = ({ post, onLikePost, onUnLikePost, timeFormatter }) => {
    const [isFavorite, setIsFavorite] = useFavoriteStatus(post._id);

    const handleFavoriteClick = async () => {
        if (isFavorite) {
            await onUnLikePost(post._id);
        } else {
            await onLikePost(post._id);
        }
        setIsFavorite(!isFavorite);
    };

    return (
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
    );
};

export default PostCard;

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    onLikePost: PropTypes.func.isRequired,
    onUnLikePost: PropTypes.func.isRequired,
    timeFormatter: PropTypes.func.isRequired,
};
