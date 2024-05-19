import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import logo from "../assets/images/images.jpeg";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal } from "../store/modal/modalSlice";

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
            </Box>
            <button
                className="bg-[#8E2947] hover:bg-[#8b3850] text-white font-bold py-2 px-4  w-full rounded-3xl"
                onClick={() => dispatch(showModal())}
            >
                Tweet
            </button>
        </section>
    );
};

export default ListSection;
