import SearchIcon from "@mui/icons-material/Search";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublishIcon from "@mui/icons-material/Publish";

const SideSection = () => {
    return (
        <section className="py-2">
            <TextField
                variant="outlined"
                size="small"
                sx={{
                    marginBottom: "12px",
                    width: "100%",
                    borderRadius: "1rem",
                    backgroundColor: "#f5f8fa",
                    paddingY: "0.15rem",
                    paddingX: "0.5rem",
                }}
                InputProps={{
                    startAdornment: (
                        <SearchIcon
                            color="secondary"
                            sx={{
                                marginRight: "0.5rem",
                            }}
                        />
                    ),
                }}
                placeholder="Search Twitter"
            />
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
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    image="https://picsum.photos/id/27/900/400
                    "
                    alt="Paella dish"
                    sx={{
                        height: 240,
                        objectFit: "cover",
                    }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="flex justify-between items-center">
                    <Tooltip title="Add to favorites">
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
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
                <Button
                className="w-full mt-2"
                variant="outlined"
                color="secondary"
                sx={{
                    borderRadius: "2rem",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    my: "0.5rem",
                }}
            >
                Show More
            </Button>
            </Card>
        </section>
    );
};

export default SideSection;
