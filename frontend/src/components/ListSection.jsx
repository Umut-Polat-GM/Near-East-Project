import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from "@mui/material";
import logo from "../assets/images/images.jpeg";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal } from "../store/modal/modalSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { logout } from "../store/user/userSlice";

const ListItems = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <SearchIcon />, text: "Explore" },
    { icon: <NotificationsNoneOutlinedIcon />, text: "Notifications" },
    { icon: <EmailOutlinedIcon />, text: "Messages" },
    { icon: <BookmarkBorderOutlinedIcon />, text: "Bookmarks" },
    { icon: <ListAltOutlinedIcon />, text: "Lists" },
    { icon: <Person2OutlinedIcon />, text: "Profile", path: "/profile" },
    { icon: <MoreHorizOutlinedIcon />, text: "More" },
];

const ListSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
        <section className="flex flex-col justify-center items-center">
            <img
                src={logo}
                alt="logo"
                style={{ width: "160px", height: "160px", marginBottom: "1rem" }}
            />
            <Box sx={{ width: "100%", maxWidth: 360 }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {ListItems.map((item, index) => (
                            <div key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() =>
                                            item.path ? navigate(item.path) : navigate("/")
                                        }
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </nav>
                <button
                    className="bg-[#8E2947] hover:bg-[#8b3850] text-white font-bold py-2 px-4  w-full rounded-3xl"
                    onClick={() => dispatch(showModal({ type: "TweetModal" }))}
                >
                    Tweet
                </button>
            </Box>

            <Box className="flex justify-between items-center w-full p-4 mt-2">
                <Avatar
                    alt="User Avatar"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    sx={{ width: 48, height: 48, marginRight: 1 }}
                />

                <Box className="flex flex-col justify-center items-start">
                    <Typography variant="body1">Fatih Keskin</Typography>
                    <Typography variant="body2">@fatihkeskin</Typography>
                </Box>

                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                // anchorOrigin={{
                //     vertical: "center",
                //     horizontal: "right",
                // }}
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
                        <ListItemButton onClick={() => dispatch(logout())}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Exit"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </section>
    );
};

export default ListSection;
