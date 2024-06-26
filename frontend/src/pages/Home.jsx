import { Box, Grid } from "@mui/material";
import ListSection from "../components/ListSection";
import MainSection from "../components/MainSection";
import SideSection from "../components/Sidesection";
import TweetModal from "../components/TweetModal";

const Home = () => {
    return (
        <Box sx={{ flexGrow: 1 }} className="text-black container mx-auto">
            <TweetModal />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListSection />
                </Grid>
                <Grid item xs={6}>
                    <MainSection />
                </Grid>
                <Grid item xs={3}>
                    <SideSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
